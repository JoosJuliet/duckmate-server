//
//
// const EventEmitter = require('events');
//
//
//
// const myEmitter = new EventEmitter();
// // Only do this once so we don't loop forever
// myEmitter.once('newListener', (event, listener) => {
//   if (event === 'event') {
//     // Insert a new listener in front
//     myEmitter.on('event', () => {
//       console.log('B');
//     });
//   }
// });
// myEmitter.on('event', () => {
//   console.log('A');
// });
// myEmitter.emit('event');
//


var express = require('express');
var storage = require('@google-cloud/storage');
var fs = require('fs');

var router = express.Router();
var gcs = storage({
	projectId: 'favorable-mark-151209',
	keyFilename : '../config/keyfile.json'

});

console.log("1");
var bucket = gcs.bucket('duckmate_1');

// download a file from your bucket.

bucket.file('duckmate_1/new/why.jpeg').download({
	destination: '../photos/why.jpeg'},function(err) {console.log("1",err)});


// bucket.upload('../photos/logo.png',function(err,file){
//
// 	console.log(err);
// 	if(!err){
// 	 	console.log("success");
// 	}
// });


module.exports = router;
