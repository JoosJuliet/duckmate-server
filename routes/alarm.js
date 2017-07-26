
var express = require('express');
var fs = require('fs');
var router = express.Router();


router.post('/',function(req, res, next){
    pool.getConnection(function(error, connection){
        if (error){
                console.log("getConnection Error" + error);
                res.sendStatus(500);
        }
        console.log(req.body.member_id);
        console.log(req.body.firebasetoken);
        console.log(req.body.today_alarm);

        connection.query('update duckmate.member set firebasToken = ? or today_alarm = ? where member_id = ?;', [ req.body.firebasetoken, req.body.today_alarm,req.body.member_id], function(error, results){
            connection.release();
            if (error){
              console.log(" post /alarm/firebasetoken Connection Error" + error);
              res.status(500);
            }
            console.log( results );
        	if( results.affectedRows === 1 ){
        		res.status(201).send({result: false});
        	}else{
                res.status(201).send({result : true});
        	}
        });//connection query

    });
});

router.get('/', function(req, res, next) {
		    console.log("time" + Date.now());
			    res.send('depromeet');
				});


module.exports = router;
