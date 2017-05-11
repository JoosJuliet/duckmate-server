
var express = require('express');
var gcloud = require('@google-cloud/storage');
var fs = require('fs');

var router = express.Router();

var gcs = gcloud({
	projectId: 'favorable-mark-151209',
	keyFilename : './config/keyfile.json'

});
console.log("1");
var bucket = gcs.bucket('duckmate_1');


/****************douwnload,upload ver ******************/

// bucket.file('why.png').download({
// 	destination: './photos/why.png'
// }, function(err) {});
//
//
// bucket.upload('./public/images/profile.png', function(err, file) {
// 	if (!err) {
// 		console.log("success");
// 	}
// });

/******************************************************/


// Streams are also supported for reading and writing files.


gcs.getBucketsStream()
  .on('error', console.error)
  .on('data', function(bucket) {
    // bucket is a Bucket object.
  })
  .on('end', function() {
    // All buckets retrieved.
  });



var remoteReadStream = bucket.file('test01.png').createReadStream();
var localWriteStream = fs.createWriteStream('./photos/test01.png');
remoteReadStream.on('error', (err) =>{
	console.log("remote err",err)
});
localWriteStream.on('error', (err) => {
	console.log("local err",err)
})
remoteReadStream.pipe(localWriteStream);



// var localReadStream = fs.createReadStream('/photos/zoo/zebra.jpg');
// var remoteWriteStream = bucket.file('zebra.jpg').createWriteStream();
// localReadStream.pipe(remoteWriteStream);

module.exports = router;

// automator 연동 api
