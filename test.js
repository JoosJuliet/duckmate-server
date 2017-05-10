
var express = require('express');
var gcloud = require('@google-cloud/storage');
var fs = require('fs');

var router = express.Router();

var gcs = gcloud({
	projectId: 'favorable-mark-151209',
	keyFilename : './config/keyfile.json'

});
console.log("1");

//gcs.createBucket('new-bucket2017-05-10', function(err,bucket){
//	console.log('createBucket err',err);
//});

var bucket = gcs.bucket('duckmate_1');


	bucket.file('why.png').download({
	  destination: './photos/why.png'
	}, function(err) {console.log("err",err);});


module.exports = router;
