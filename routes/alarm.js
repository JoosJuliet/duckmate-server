
var express = require('express');
var fs = require('fs');
var router = express.Router();

router.route('/')
.post((req, res)=>{
    if( !req.body.firebaseToken ){
        res.json({
            result: false,
            msg: "req.body.firebaseToken이 없습니다."
        });
        return;
    }else if( !req.body.today_alarm ){
        res.json({
            result: false,
            msg: "req.body.today_alarm이 없습니다."
        });
        return;
    }else if( !req.body.member_id ){
        res.json({
            result: false,
            msg: "req.body.member_id이 없습니다."
        });
        return;
    }else if( !req.body['0_flag']){
        res.json({
            result: false,
            msg: "req.body.0_flag이 없습니다."
        });
        return;
    }else if( !req.body['1_flag'] ){
        res.json({
            result: false,
            msg: "req.body.1_flag이 없습니다."
        });
        return;
    }else if( !req.body['2_flag'] ){
        res.json({
            result: false,
            msg: "req.body.2_flag이 없습니다."
        });
        return;
    }else if( !req.body['3_flag'] ){
        res.json({
            result: false,
            msg: "req.body.3_flag이 없습니다."
        });
        return;
    }

    pool.query( 'update duckmate.member set irebaseToken = ?, today_alarm = ?, 0_flag = ?, 1_flag = ?, 2_flag = ?, 3_flag = ?  where member_id = ?;', [ req.body.firebaseToken, req.body.today_alarm, req.body['0_flag'],req.body['1_flag'],req.body['2_flag'],req.body['3_flag'], req.body.member_id] , function( err, results ) {
        if (err){
            res.json({
                result: false,
                msg: "db 접속 에러",
                qry: this.sql
            });
            return;
        }
        if( results.affectedRows === 1 ){
            res.status(201).json({
                result: true,
                msg: "업데이트가 완료되었습니다.",
            });
        }else{
            res.status(201).json({
                result: false,
                msg: "업데이트를 실패했습니다.",
            });
        }
    });
})
.get((req,res)=>{
    if( !req.query.member_id ){
        res.json({
            result: false,
            msg: "req.body.member_id가 없습니다."
        });
        return;
    }
    pool.query( 'select 0_flag,1_flag,2_flag,3_flag,today_alarm FROM duckmate.member where member_id = ?  ;', [ req.query.member_id ] , function( err, rows ) {
        if (err){
            console.log("여기서 에러"+this.sql);
            res.status(200).json({
                result: false,
                qry: this.sql,
                msg: "db 접속 에러",
            });
            return;
        }
        rows = JSON.parse( JSON.stringify(rows));
		rows = rows[0];
        if( rows ){

			let dataObject = {
				"0_flag" : rows["0_flag"],
                "1_flag" : rows["1_flag"],
                "2_flag" : rows["2_flag"],
                "3_flag" : rows["3_flag"],
                "today_alarm" : rows.today_alarm

            };
			console.log(dataObject);
            res.status(200).json({
                result: true,
                msg: "가져오기 성공",
                data : dataObject,
            });
        }else{
            res.status(200).json({
                result: false,
                msg: "해당 member_id가 등록되있지 않습니다.",
            });
			return;
        }
    });
});



module.exports = router;
