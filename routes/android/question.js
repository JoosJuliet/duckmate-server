
var express = require('express');
var router = express.Router();
var app = express();
var fs = require('fs');

router.route('/')
.post((req, res)=>{
    const properties = [ "firebaseToken", "questions_title", "questions_main", "questions_mail"];
    for(var i=0; i< properties.length;i++){
        if(!req.body.hasOwnProperty(properties[i])){
            res.json({
                result: false,
                msg: "req.body."+properties[i]+"이 없습니다."
            });
            return;
        }
    }

    pool.query( 'insert into questions( firebaseToken, questions_title, questions_main, questions_mail) values(?,?,?,?)',
    [ req.body.firebaseToken, req.body.questions_title, req.body.questions_main, req.body.questions_mail] , function( err, results ) {
        if (err){
    		console.log(err);
    		res.status(500).json({
                    result: false,
                    msg: "db 접속 에러",
                    qry: this.sql
                });
                return;
        }
	    console.log(results,this.sql);
        if( results.affectedRows ){
            res.status(201).json({
                result: true,
                msg: "업데이트가 완료되었습니다.",
            });
        }else{
            res.status(201).json({
                result: false,
                msg: "업데이트가 실패되었습니다.",
            });
        }
    });
})
.get((req,res)=>{

   console.log( "1",req.fbpage.m);
		console.log(req.query.firebaseToken);
		if(!req.query.firebaseToken){
        res.status(500).json({
            result: false,
            msg: "req.params.firebaseToken이 없습니다."
        });
        return;
    }

    pool.query( 'select * from questions where firebaseToken = ?;', [ req.query.firebaseToken ] , function( err, rows ) {
        if (err){
            console.log(err);
            res.json({
                    result: false,
                    msg: "db 접속 에러",
                    qry: this.sql
                });
                return;
        }
        console.log(rows);
        if( rows.length ){
            res.status(200).json({
                result: true,
                msg: "업데이트가 완료되었습니다.",
                data: rows[0]
            });
        }else{
            res.status(201).json({
                result: false,
                msg: "업데이트가 실패되었습니다.",
            });
        }
    });
});


module.exports = router;
