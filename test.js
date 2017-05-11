
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

var remoteFile = bucket.file('test1.png');
var localFilename = './photos/test01.png';

remoteFile.createReadStream()
	.on('error', function(err) {console.log("err",err);})
	.on('response', function(response) {
		console.log("response",response);
	// Server connected and responded with the specified status and headers.
	})
	.on('end', function() {
		console.log("end");
	// The file is fully downloaded.
	})
	.pipe(fs.createWriteStream(localFilename));



module.exports = router;

// automator 연동 api
