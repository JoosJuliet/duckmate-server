
var express = require('express');
var router = express.Router();
var app = express();
var fs = require('fs');




router.post('/', function(req, res, next){

        pool.getConnection(function(error, connection){
        if (error){
                console.log("getConnection Error" + error);
                res.sendStatus(500);
        }

                var sql, inserts;
                sql = 'insert into questions(question_main,question_mail) values(?,?)';
                inserts = [ req.body.question_main, req.body.question_mail];

                connection.query(sql, inserts, function(error, rows){
                if (error){
                  console.log("Connection Error" + error);
                  res.sendStatus(500);
                }
                  res.status(201).send({result : 'success'});
                  connection.release();
                 });//connection query 

  });
});

module.exports = router;
