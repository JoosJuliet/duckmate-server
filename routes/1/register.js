var express = require('express');
var router = express.Router();
var app = express();
var fs = require('fs');

router.post('/',function(req, res, next){

    pool.getConnection(function(error, connection){
        if (error){
                console.log("getConnection Error" + error);
                res.sendStatus(500);
        }
        console.log(req.body.member_name);
        var sql = 'insert into duckmate.member(member_email, member_passwd, member_name) values(?,?,?)';
        var inserts = [ req.body.member_email, req.body.member_passwd, req.body.member_name];
        connection.query(sql, inserts, function(error, rows){
            connection.release();
            if (error){
              console.log("register에서 post / Connection Error" + error);
              res.status(500);
            }

        	if( rows.length == 0 ){
        		res.status(201).send({result: false});
        	}else{
                res.status(201).send({result : true});
        	}
        });//connection query

    });
});



router.get('/:member_name', function(req, res, next) {
    pool.getConnection(function(error, connection){
        if (error){
            console.log("getConnection Error" + error);
            res.sendStatus(500);
        }
        var CheckMemberName = "SELECT * FROM duckmate.member where member_name =? ;"
        connection.query(CheckMemberName,[req.params.member_name], function(error, rows){
            connection.release();
            if (error){
              console.log("register에서 get /:member_email Connection Error" + error);
              res.sendStatus(500);
            }

            // console.log("rows는",rows[0]);

            if( rows.length == 0){
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
