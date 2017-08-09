var express = require('express');
var router = express.Router();
var app = express();
var fs = require('fs');


router.get('/', function(req, res, next) {
  pool.getConnection(function(error, connection){
    if (error){
      console.log("getConnection Error" + error);
      res.sendStatus(500);
    }
     connection.query('select * from program', function(error, rows){
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