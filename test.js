
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


//douwnload
bucket.file('why.png').download({
  destination: './photos/why.png'
}, function(err) {});


bucket.upload('./public/images/profile.png', function(err, file) {
  if (!err) {
    // "zebra.jpg" is now in your bucket.
  }
});


// automator 연동 api



// Streams are also supported for reading and writing files.
var remoteReadStream = bucket.file('giraffe.jpg').createReadStream();
var localWriteStream = fs.createWriteStream('/photos/zoo/giraffe.jpg');
remoteReadStream.pipe(localWriteStream);

var localReadStream = fs.createReadStream('/photos/zoo/zebra.jpg');
var remoteWriteStream = bucket.file('zebra.jpg').createWriteStream();
localReadStream.pipe(remoteWriteStream);

module.exports = router;
