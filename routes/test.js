
var express = require('express');
var storage = require('@google-cloud/storage');
var fs = require('fs');

var router = express.Router();
var gcs = storage({
	projectId: 'favorable-mark-151209',
	keyFilename : '../config/6bd59188cef8.json'

});

var bucket = gcs.bucket('duckmate');

// download a file from your bucket.

bucket.file('logo.png').download({
	destination: '../photos/logo.png'},function(err) {console.log("1")});


bucket.upload('../photos/logo.png',function(err,file){

	console.log(err);
	if(!err){
	 	console.log("success");
	}
});


module.exports = router;
