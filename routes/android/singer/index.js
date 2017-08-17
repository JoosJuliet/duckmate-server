var express = require('express');
var mysql = require('mysql');

var fs = require('fs');
var router = express.Router();


Object.defineProperty(global, '__stack', {
    get: function(){
        var orig = Error.prepareStackTrace;
		console.log("처음 orig ",orig);
        Error.prepareStackTrace = function(_, stack){ return stack; };
		var err = new Error;
        Error.captureStackTrace(err, arguments.callee);
        var stack = err.stack;
       	console.log("err.stack은 ",stack);
		Error.prepareStackTrace = orig;
		console.log("changed orig는 ",orig);
        return stack;
    }
});

Object.defineProperty(global, '__line', {
    get: function(){
       console.log("__line에서의 __stack",__stack[1]);
		//return __stack[1].getLineNumber();
	   return __stack[1]
    }
});





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
        if( rows.length === 0 || rows.length === 1 ){
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
		console.log(rows);
        if( rows.length === 0 )
        {
            res.status(200).json({
                result: false,
                msg: "해당 맴버가 디비에 없네요.",
            });
        }
        else next();
    });

});



/*
router.route('/')
.post((req, res)=>{

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
        if( rows.length === 0 || rows.length === 1 ){
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
*/
router.route('/')
.delete((req,res)=>{
    if( !req.body.singer_id ){
        res.json({
            result: false,
            msg: "req.body.singer_id이 없습니다."
        });
        return;
    }

// select * from 테이블명 where 필드명 not in ('제외할문자1','제외할문자2'...등); 인 으로 알아내야하나?


    pool.query('update from duckmate.member SET singer_id = ? where firebaseToken=?;', [ req.body.singer_id, req.body.firebaseToken ], function(error, results, fields) {
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

})
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

       // console.log("rows[0]",rows[0], rows.length);
        if( rows.length === 0  ){
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
        	if( !rows[0].singer0_id ) delete data.singer0_id;
			if( !rows[0].singer1_id ) delete data.singer1_id;
        	if( !rows[0].singer2_id ) delete data.singer2_id;
        	if( !rows[0].singer3_id ) delete data.singer3_id;


			// console.log("data",data);
			let Length = Object.keys(data).length;
			// console.log("길이",Length);
            detectSingerInfo(data,Length);

        }
    });

    const detectSingerInfo = (singer,length) =>{

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
				console.log("rows",rows);

				try {rows = JSON.parse( JSON.stringify(rows[0]) ); }
				catch(e) {
				let line = ( new Error() ).stack.toString().split("\n")[ 3 ].split(" ").pop().split(":")[ 1 ];
				    let filename = ( new Error() ).stack.toString().split("\n")[ 3 ].split("(").pop().split(" ").pop().split(":")[ 0 ];
					console.log("line은???",line);
					console.log("filename은???",line);
				console.log("parse 에러",e);
                	console.log("흠 ", __line);
					console.log("뭐야 이거");
					console.trace();
					console.log("directory 이다다ㅏㅇ아ㅏ앙");
                }
				arrr.push(rows);
                console.log("1",arrr);
				if( arrr.length === length ) {
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
