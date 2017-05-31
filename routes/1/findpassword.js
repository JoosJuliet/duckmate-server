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

		// if문 으로 email이 있는지 없는지 확인
		sql = 'select * from duckmate.member where member_email =?';
    	inserts = [req.body.member_email ];

    	connection.query(sql, inserts, function(error, rows){
			console.log("rows",rows);

	    	if (error){
	    	  console.log("Connection Error" + error);
	    	  res.status(500).send({result : "db error"});
	   		}
			// 뭐가 없음  이거
			if( rows[0] == undefined ){
                res.status(201).send(
                    { result: false }

                );
                return
            } else { //뭐가 있음 이거

				//있다면 여기
		    	sql = 'update duckmate.member set helpflag = 1 where member_email =?';
		    	inserts = [req.body.member_email ];

		    	connection.query(sql, inserts, function(error, rows){
					connection.release();

					console.log("rows",rows);

			    	if (error){
			    	  console.log("Connection Error" + error);
			    	  res.status(500).send({result : "db error"});
			   		}

		            res.status(201).send(
		                { result: true }
		            );
		            return
		 		});//connection query

			}


		});


  	});
})

module.exports = router;
