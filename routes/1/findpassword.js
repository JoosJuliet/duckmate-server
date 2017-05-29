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
    	sql = 'update duckmate.member set helpflag = 1 where member_email =?';
    	inserts = [req.body.member_email ];

    	connection.query(sql, inserts, function(error, rows){
			connection.release();

	    	if (error){
	    	  console.log("Connection Error" + error);
	    	  res.status(500).send({result : "db error"});
	   		}

			if( rows[0].length == 0 ){
                res.status(201).send(
                    { result: false }
                );
                return
            }

            res.status(201).send(
                { result: true }
            );
            return
 		});//connection query

  	});
})

module.exports = router;
