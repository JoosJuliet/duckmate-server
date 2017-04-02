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


//bucket list check
listBuckets();

function listBuckets () {
  // Instantiates a client
  const storage = Storage();

  // Lists all buckets in the current project
  return storage.getBuckets()
    .then((results) => {
      const buckets = results[0];

      console.log('Buckets:');
      buckets.forEach((bucket) => console.log(bucket.name));

      return buckets;
    });
};

const projectId = 'favorable-mark-151209';

var gcs = require('@google-cloud/storage')({
  projectId: projectId,
  keyFilename: './upload/MyProject-2dce008296ec.json'
});
var bucket = gcs.bucket('duckmate_1');

bucket.file('hi.png').download({
	destination: './photos/hi.png'
},function(err){
	if(err){
		console.log(err);
	}

	console.log("success");
});



router.post('/', upload.single('member_img') ,function(req, res, next){

        pool.getConnection(function(error, connection){
        if (error){
                console.log("getConnection Error" + error);
                res.sendStatus(500);
        }
    
                var sql, inserts;
                sql = 'insert into member(member_img,email,passwd, member_name) values(?,?,?,?)';
                inserts = [ req.body.member_img, req.body.nickname];

                connection.query(sql, inserts, function(error, rows){
                if (error){
                  console.log("Connection Error" + error);
                  res.sendStatus(500);
                }
                  res.status(201).send({result : 'success'});
                  connection.release();
                 });//connection query 

  });
});



module.exports = router;
