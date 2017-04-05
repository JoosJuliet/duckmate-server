var express = require('express');
var router = express.Router();
var app = express();
var fs = require('fs');
console.log("hi registersns");


var exit_flag = false;

console.log(1);
fs.watch(__filename, (eventType, filename) => {
console.log( 1);
    if( exit_flag )return;
    exit_flag = true;
console.log( 3, eventType );
    if( eventType ==  'rename' || eventType ==  'change' ){
console.log( 2);
        setTimeout(()=>{
            process.exit();
        },2000);
    }
});



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

