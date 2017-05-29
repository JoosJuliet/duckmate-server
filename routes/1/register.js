var express = require('express');
var router = express.Router();
var app = express();


/*******img올리기 위해 필요한 것들 ********/
var fs = require('fs');
var imagePath = "public/images";
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
var Q = require("q");
/************************************/


router.post('/',function(req, res, next){
// db에서 notnull인 것 없을 때 예외처리 다 해야한다

// member_img,member_email,member_passwd, member_name
// member_img은 member_email로 이름을 만든다.

    pool.getConnection(function(error, connection){
        if (error){
                console.log("getConnection Error" + error);
                res.sendStatus(500);
        }
        console.log(req.body.member_email);
        console.log(req.body.member_passwd);
        console.log(req.body.member_name);
        var sql = 'insert into duckmate.member(member_email, member_passwd, member_name) values(?,?,?)';
        var inserts = [ req.body.member_email, req.body.member_passwd, req.body.member_name];
        connection.query(sql, inserts, function(error, rows){
            connection.release();
            if (error){
              console.log("register에서 post / Connection Error" + error);
              res.status(500);
            }
            console.log( rows );
        	if( rows.length == 0 ){
        		res.status(201).send({result: false});
        	}else{
                res.status(201).send({result : true});
        	}
        });//connection query

    });
});



router.get('/:member_email', function(req, res, next) {
    pool.getConnection(function(error, connection){
        if (error){
            console.log("getConnection Error" + error);
            res.sendStatus(500);
        }
        var CheckMemberName = "SELECT * FROM duckmate.member where member_email =? ;"
        connection.query(CheckMemberName,[req.params.member_name], function(error, rows){
            connection.release();
            if (error){
              console.log("register에서 get /:member_email Connection Error" + error);
              res.sendStatus(500);
            }

            // console.log("rows는",rows[0]);

            if( rows[0] == undefined ){
                res.status(201).send(
                    { result: false }
                );
                return
            }

            res.status(201).send(
                { result: true }
            );
            return


        });// connection
    });// pool
}); // :member_name



module.exports = router;
