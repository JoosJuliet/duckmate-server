
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
    }

    pool.query( 'update duckmate.member set firebasToken = ? or today_alarm = ? where member_id = ?;', [ req.body.firebaseToken, req.body.today_alarm,req.body.member_id] , function( err, results ) {
        if (err){
            res.json({
                result: false,
                msg: "db 접속 에러"
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
    pool.query( 'select 0_flag,1_flag,2_flag,3_flag,4_flag,today_alarm FROM duckmate.member where member_id = ?  ;', [ req.body.member_id ] , function( err, rows ) {
        if (err){
            console.log("여기서 에러"+this.sql);
            res.json({
                result: false,
                qry: this.sql,
                msg: "db 접속 에러",
            });
            return;
        }
        console.log(rows);
        rows = JSON.stringify(rows);
        if( rows ){
            res.status(201).json({
                result: true,
                msg: "가져오기 성공",
                data : rows
            });
        }else{
            res.status(201).json({
                result: false,
                msg: "해당 member_id가 등록되있지 않습니다.",
            });
        }
    });
});

router.get('/', function(req, res, next) {
    console.log("time" + Date.now());
    res.send('depromeet');
});


module.exports = router;
