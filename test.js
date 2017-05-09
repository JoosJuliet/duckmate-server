
var express = require('express');
var gcloud = require('@google-cloud/storage')({
	projectId: 'favorable-mark-151209',
        keyFilename : './config/keyfile.json'
});
var fs = require('fs');

var router = express.Router();

console.log("1");
var bucket = gcloud.bucket('duckmate_1');

var gcs = gcloud.storage();
var bucket = gcs.bucket('photos');

console.log(bucket);


// download a file from your bucket.

//bucket.file('why.jpeg').download({
//	destination: './photos/why.jpeg'},function(err) {console.log("err",err)});


// bucket.upload('../photos/logo.png',function(err,file){
//
// 	console.log(err);
// 	if(!err){
// 	 	console.log("success");
// 	}
// });


module.exports = router;










//const EventEmitter = require('events');



//const myEmitter = new EventEmitter();
// Only do this once so we don't loop forever
//myEmitter.once('newListener', (event, listener) => {
 // if (event === 'event') {
    // Insert a new listener in front
 //   myEmitter.on('event', () => {
//      console.log('B');
//    });
//  }
//});
//myEmitter.on('event', () => {
//  console.log('A');
//});
//myEmitter.emit('event');
