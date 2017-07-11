
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

        var sql = 'update duckmate.member set firebasToken = ? where member_id = ?';
        var inserts = [ req.body.firebasetoken, req.body.member_id];
        connection.query(sql, inserts, function(error, rows){
            connection.release();
            if (error){
              console.log(" post /alarm/firebasetoken Connection Error" + error);
              res.status(500);
            }
            console.log( rows );
        	if( rows.length == 0 ){
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
