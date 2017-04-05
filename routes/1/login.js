
var express = require('express');
var router = express.Router();
var app = express();
var fs = require('fs');
var multer = require('multer');
var upload = multer({ dest : 'upload/' })
const Storage = require('@google-cloud/storage');

console.log("hi");

var exit_flag = false;

fs.watch(__filename, (eventType, filename) => {
    if( exit_flag )return;
    exit_flag = true;
    if( eventType ==  'rename' || eventType ==  'change' ){
        setTimeout(()=>{
            process.exit();
        },2000);
    }
});


console.log("db connect register");
router.get('/', function(req, res, next) {
console.log("time"+
Date.now());
         res.send('register');
});



router.post('/', function(req, res, next){

        pool.getConnection(function(error, connection){
        if (error){
                console.log("getConnection Error" + error);
                res.sendStatus(500);
        }

                var qry = 'select *  from duckmate.member where email =? and passwd =?';
               	var data = [ req.body.email , req.body.passwd ];
		//var data = ["s@n.v","hi"];
                connection.query(qry,data, function(error, rows){
                if (error){
                  console.log("Connection Error" + error);
                  res.sendStatus(500);
                }
			
                	console.log("1",rows);	
			
			if(rows.length == 0){
				res.status(201).send({result:"false"});
			}else{
				res.status(201).send({result:"success"});
                	}
			connection.release();
                });//connection query 

  });
})



module.exports = router;


