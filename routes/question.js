
var express = require('express');
var router = express.Router();
var app = express();
var fs = require('fs');




router.post('/send', function(req, res, next){

        pool.getConnection(function(error, connection){
        if (error){
                console.log("getConnection Error" + error);
                res.sendStatus(500);
        }

                var sql, inserts;
                sql = 'insert into questions(member_id, questions_title, questions_main, questions_mail) values(?,?,?,?)';
                inserts = [ req.body.member_id, req.body.questions_title, req.body.questions_main, req.body.questions_mail];

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

router.get('/list/:member_id', function(req, res, next) {
  pool.getConnection(function(error, connection){
    if (error){
      console.log("getConnection Error" + error);
      res.sendStatus(500);
    }
    else{
      connection.query('select * from questions where member_id = ?',
       [req.params.member_id], function(error, rows){
        if (error){
          console.log("Connection Error" + error);
          res.sendStatus(500);
          connection.release();
        }
        else {
          res.status(200).send({result : rows[0]});
          connection.release();
        }
      });
    }
  });
});


module.exports = router;
