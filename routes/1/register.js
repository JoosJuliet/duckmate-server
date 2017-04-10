var express = require('express');
var router = express.Router();
var app = express();
var fs = require('fs');
var multer = require('multer');
var upload = multer({ dest : 'upload/' })
const STORAGE = require('@google-cloud/storage');

//bucket list check
//listBuckets();

/*function listBuckets () {
  // Instantiates a client
  const storage = STORAGE();

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

*/



router.post('/',function(req, res, next){

        pool.getConnection(function(error, connection){
        if (error){
                console.log("getConnection Error" + error);
                res.sendStatus(500);
        }

                var sql = 'insert into duckmate.member(email, passwd, member_name) values(?,?,?)';
               var inserts = [ req.body.email, req.body.passwd, req.body.member_name];
	//	var inserts = ["d@d.b","23","hoho"]
                connection.query(sql, inserts, function(error, rows){
                if (error){
                  console.log("Connection Error" + error);
                  res.status(500);
                }

		if(rows.length == 0){
			res.status(201).send({result: "false"});
		}else{
			console.log("1",rows);
                	res.status(201).send({result : 'success'});
		}
                connection.release();
               	});//connection query

  });
});



module.exports = router;
