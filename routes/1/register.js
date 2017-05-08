var express = require('express');
var router = express.Router();
var app = express();
var fs = require('fs');
var multer = require('multer');
var upload = multer({ dest : 'upload/' })
const STORAGE = require('@google-cloud/storage');

router.post('/',function(req, res, next){

    pool.getConnection(function(error, connection){
        if (error){
                console.log("getConnection Error" + error);
                res.sendStatus(500);
        }

        var sql = 'insert into duckmate.member(email, passwd, member_name) values(?,?,?)';
        var inserts = [ req.body.email, req.body.passwd, req.body.member_name];
        connection.query(sql, inserts, function(error, rows){
            connection.release();
            if (error){
              console.log("Connection Error" + error);
              res.status(500);
            }

        	if(rows.length == 0){
        		res.status(201).send({result: "false"});
        	}else{
        		console.log("1",rows);
                    	res.status(201).send({result : 'success'});
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
        var CheckMemberName = "SELECT member_name FROM duckmate.member where member_email =? ;"
        connection.query(CheckMemberName,[req.params.member_email], function(error, rows){
            connection.release();
            if (error){
              console.log("Connection Error" + error);
              res.sendStatus(500);
            }

            console.log("rows는",rows[0]);

            if( rows[0] == undefined){
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
