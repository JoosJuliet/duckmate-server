
var express = require('express');
var fs = require('fs');
var router = express.Router();

router.post('/',function(req, res, next){
    if( !req.body.firebasetoken ){
        ResponseToJson(false,"req.body.firebasetoken이 없습니다.");
        return;
    }else if( !req.body.today_alarm ){
        ResponseToJson(false,"req.body.today_alarm이 없습니다.");
        return;
    }else if( !req.body.member_id ){
        ResponseToJson(false,"req.body.member_id이 없습니다.");
        return;
    }

    pool.query( 'update duckmate.member set firebasToken = ? or today_alarm = ? where member_id = ?;', [ req.body.firebasetoken, req.body.today_alarm,req.body.member_id] , function( err, results ) {
        if (err){
            ResponseToJson(false,"db 접속 에러");
            return;
        }
        if( results.affectedRows === 1 ){
            ResponseToJson(true,"업데이트가 완료되었습니다.");
        }else{
            ResponseToJson(false,"업데이트를 실패했습니다.");
            return;
        }
    });
});

router.get('/', function(req, res, next) {
    console.log("time" + Date.now());
    res.send('depromeet');
});


module.exports = router;
