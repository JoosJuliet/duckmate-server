var express = require('express');
var mysql = require('mysql');

var fs = require('fs');
var db_config = require('../config/db_config.json');
var router = express.Router();



router.get('/:member_id', function(req, res, next) {
  pool.getConnection(function(error, connection){
    if (error){
      console.log("getConnection Error" + error);
      res.sendStatus(500);
    }
    else{
      connection.query('select * from singer order by choice_count desc', function(error, rows){
        if (error){
          console.log("Connection Error" + error);
          res.sendStatus(500);
          connection.release();
        }
        else {
          res.status(200).send({result : rows});
          connection.release();
        }
      });
    }
  });
});


module.exports = router;
