var express = require('express');
var router = express.Router();
var app = express();
var fs = require('fs');
console.log("hi board");



router.get('/:member_id', function(req, res, next) {
  pool.getConnection(function(error, connection){
    if (error){
      console.log("getConnection Error" + error);
      res.sendStatus(500);
    }
     connection.query('select singerb_id, singer0_id, singer1_id, singer2_id, singer3_id from mylist where member_id=?',[req.params.member_id], function(error, rows){
        if (error){
          console.log("Connection Error" + error);
          res.sendStatus(500);
        }
          res.status(200).send({result : rows});
          connection.release();
      });//connection query 
  }); //pool 
});

router.put('/change/:member_id', function(req, res, next) {
  pool.getConnection(function(error, connection){
    if (error){
      console.log("getConnection Error" + error);
      res.sendStatus(500);
    }
     connection.query('select singerb_id, singer0_id, singer1_id, singer2_id, singer3_id from mylist where member_id=?',[req.params.member_id], function(error, rows){
        if (error){
          console.log("Connection Error" + error);
          res.sendStatus(500);
        }
          res.status(200).send({result : rows});
          connection.release();
      });//connection query
  }); //pool
});


module.exports = router;
