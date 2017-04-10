var express = require('express');
var router = express.Router();
var app = express();
var fs = require('fs');
console.log("hi registersns");




router.get('/', function(req, res, next) {
console.log("time"+
Date.now());
         res.send('registersns');
});


router.post('/', function(req, res, next){

	pool.getConnection(function(error, connection){
    	if (error){
      		console.log("getConnection Error" + error);
      		res.sendStatus(500);
    	}

      		var sql, inserts;
        	sql = 'insert into duckmate.member( member_name) values(?)';
        	inserts = [  req.body.nickname];

        	connection.query(sql, inserts, function(error, rows){
        	if (error){
        	  console.log("Connection Error" + error);
        	  res.sendStatus(500);
       		}
             	  res.status(201).send({result : 'success'});
         	  connection.release();
     		 });//connection query

  });
})



module.exports = router;
