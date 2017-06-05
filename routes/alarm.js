
var express = require('express');
var mysql = require('mysql');
var multer = require('multer');
var fs = require('fs');
var db_config = require('../config/db_config.json');
var router = express.Router();
var exit_flag = false;


var pool = mysql.createPool({
  host : db_config.host,
  port : db_config.port,
  user : db_config.user,
  database : db_config.database,
  connectionLimit : db_config.connectionLimit
});

router.post('/firebasetoken',function(req, res, next){
    pool.getConnection(function(error, connection){
        if (error){
                console.log("getConnection Error" + error);
                res.sendStatus(500);
        }
        console.log(req.body.member_id);
        console.log(req.body.firebasetoken);

        var sql = 'update duckmate.member set firebasToken = ? where member_id = ?';
        var inserts = [ req.body.firebasetoken, req.body.member_id];
        connection.query(sql, inserts, function(error, rows){
            connection.release();
            if (error){
              console.log(" post /alarm/firebasetoken Connection Error" + error);
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


module.exports = router;
