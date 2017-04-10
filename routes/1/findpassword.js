var express = require('express');
var router = express.Router();
var app = express();
var fs = require('fs');


router.post('/findpassword', function(req, res, next){

	pool.getConnection(function(error, connection){
    	if (error){
      		console.log("getConnection Error" + error);
      		res.sendStatus(500);
    	}
  		var sql, inserts;
    	sql = 'update duckmate.member set helpflag = 1 where member_id =?';
    	inserts = [req.body.member_id ];

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
