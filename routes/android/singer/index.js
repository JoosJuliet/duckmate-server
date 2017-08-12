var express = require('express');
var mysql = require('mysql');

var fs = require('fs');
var router = express.Router();


router.route('/rank')
.get((req, res)=>{
    // TODO rank/singer로 바꾸자
    // rank/member도 해야하니까

    pool.query('select singer_id, singer_name, singer_img from singer order by choice_count desc', [req.query.firebaseToken] , function( err, rows ) {
        if (err){
            console.log(err);
            res.status(500).json({
                result: false,
                msg: "db 접속 에러",
                qry: this.sql
            });
            return;
        }
        if( !rows.length ){
            res.status(200).json({
                result: false,
                msg: "singer들이 없네요",
            });
        }else{
            res.status(200).json({
                result: true,
                msg: "singer 들 목록입니다.",
                data : rows
            });
        }
    });
});

router.route('/')
.delete((req,res)=>{
    if( !req.body.singer_id ){
        res.json({
            result: false,
            msg: "req.body.singer_id이 없습니다."
        });
        return;
    }
    pool.query('delete from duckmate.singer where singer_id=?;', [req.body.singer_id], function(error, results, fields) {
        if (error) {
            console.log("delete /singer Error" + error);
            res.sendStatus(500).send({
                result: false,
                msg : "delete /singer에서 db pool error",
                sql : this.sql
            });
            return;
        } // error
        if( results.affectedRows ){
            res.status(201).send({
                result: true,
                msg : "성공적으로 삭제되었습니다."
            });
        }else{
            res.status(201).send({
                result: false,
                msg : "삭제 실패!"
            });
        }

    });

});

router.use((req, res, next)=>{
    let firebaseToken;
    let rqstMethodCheck = (req.method == 'GET') ? req.query : req.body;
    if( !rqstMethodCheck.firebaseToken ){
        res.json({
            result: false,
            msg: "[ firebaseToken ]이 필요함"
        });
        return;
    } else {
        firebaseToken = rqstMethodCheck.firebaseToken ;
    }
    pool.query( 'select 1 from duckmate.member where firebaseToken = ?;' ,[ firebaseToken ] , (err,rows)=>{
        // TODO 은행업무중에서 헤리슨님한테 -10 나 +10해야하는데
        // 헤리슨님 -10하고 죽음 안되니까 transaction을 써야한다
        if (err){
            res.status(500).json({
                result: false,
                msg: "db 접속 에러",
                qry: this.sql
            });
            return;
        }

        if( rows.length ) next();
        else
        {
            res.status(200).json({
                result: false,
                msg: "프로그램이 없네요.",
            });
        }

    });

});



router.route('/')
.post((req, res)=>{
    // 가수들 처음 추가할 때 추가

    const properties = ['singer_id','singerNum','firebaseToken'];
    for(var i=0; i< properties.length;i++){
        if(!req.body.hasOwnProperty(properties[i])){
            res.json({
                result: false,
                msg: "req.body."+properties[i]+"이 없습니다."
            });
            return;
        }
    }
    pool.query('update duckmate.member SET singer' + req.body.singerNum + '_id = ? where firebaseToken = ?;', [ req.body.singer_id, req.body.firebaseToken] , function( err, results ) {
        if (err){
    		console.log(err);
    		res.status(500).json({
                    result: false,
                    msg: "db 접속 에러",
                    qry: this.sql
            });
            return;
        }
        if( results.affectedRows ){
            res.status(201).json({
                result: true,
                msg: "업데이트가 완료되었습니다.",
            });
        }else{
            res.status(200).json({
                result: false,
                msg: "업데이트를 실패했습니다.",
            });
        }
    });
})
.get((req,res)=>{
//TODO 에러처리 부족
    if(!req.query.firebaseToken){
        res.json({
            result: false,
            msg: "req.query.firebaseToken이 없습니다."
        });
        return;
    }

    pool.query('SELECT singer0_id, singer1_id, singer2_id , singer3_id FROM duckmate.member where firebaseToken = ? ;', [req.query.firebaseToken] , function( err, rows ) {
        if (err){
    		console.log(err);
    		res.status(500).json({
                    result: false,
                    msg: "db 접속 에러",
                    qry: this.sql
            });
            return;
        }
        if( !rows.length ){
            res.status(200).json({
                result: false,
                msg: "singer가 들어있는게 없네요;",
            });
        }else{
            let data = {
                singer0_id: rows[0].singer0_id,
                singer1_id: rows[0].singer1_id,
                singer2_id: rows[0].singer2_id,
                singer3_id: rows[0].singer3_id
            };
            detectSingerInfo(data);
            let Length = Object.keys(data).length;

        }
    });

    const detectSingerInfo = (singer) =>{

		let arr = [];
		let arrr = [];
		const selectSingerDB = (id) =>{

            pool.query('SELECT * FROM duckmate.singer where singer_id = ? ;', [id] , function( err, rows ) {
                if (err){
             		console.log(err);
            		res.status(500).json({
                             result: false,
                             msg: "db 접속 에러",
                             qry: this.sql
                    });
                    return;
                }
				rows = JSON.parse( JSON.stringify(rows[0]) );
				console.log("rows",rows );
				arrr.push(rows);

				if(arrr.length == '4' ) {
					res.status(200).json({
                        result: true,
                        msg: "각 가수정보를 가져왔습니다.",
                        data : arrr
                    });
                }else{
					return;
				}
            });
        };

        for(let i = 0 ; i < 4; i++)
            arr.push(selectSingerDB(singer["singer"+i+"_id"]));


 		return;
	};


    //내 가수들에 대한  singer_id,singer_name,singer_img,choice_count

});

module.exports = router;