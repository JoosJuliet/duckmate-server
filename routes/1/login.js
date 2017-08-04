
var express = require('express');
var router = express.Router();
var app = express();
var fs = require('fs');

router.post('/', function(req, res, next){
    const properties = ['email','passwd'];
    for(var i=0; i< properties.length;i++){
        if(!req.body.hasOwnProperty(properties[i])){
            res.json({
                result: false,
                msg: "req.body."+properties[i]+"이 없습니다."
            });
            return;
        }
    }
    pool.query( 'select firebaseToken from duckmate.member where member_email =? and member_passwd =?', [ req.body.email, req.body.passwd] , function( err, rows ) {
        if (err){
    		console.log(err);
    		res.status(201).json({
                    result: false,
                    msg: "db 접속 에러",
                    qry: this.sql
                });
            return;
        }
        if( rows.length ){
            res.status(200).json({
                result: true,
                msg: "로그인이 완료되었습니다.",
                data : rows[0]
            });
        }else{
            res.status(200).json({
                result: false,
                msg: "회원가입이 안되있는 email과 passwd입니다.",
            });
        }
    });


}); //post



module.exports = router;
