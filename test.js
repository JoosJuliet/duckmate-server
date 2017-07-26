
var express = require('express');
var fs = require('fs');

var router = express.Router();

var gcs = require('@google-cloud/storage')({
    projectId: 'defflee-162207',
    keyFilename : './config/keyfile.json'
});
var myBucket = gcs.bucket('duckmate');
var file = myBucket.file('image.png');

var options = {
      entity: 'allUsers',
              role: gcs.acl.READER_ROLE
};

file.acl.add(options, function(err, aclObject) {
        if(err){ console.log(err); return;}else{
    console.log("1");

        }
        });


//gsutil defacl set public-read gs://{bucket-name}
//이거하면 그 bucket public된다




myBucket.upload('./public/image.png', function(err, file) {
    if (!err) {
        console.log("success");
    }else{
        console.log(err);
    }
});
/*
var gcs = gcloud({
	projectId: 'defflee-162207',
	keyFilename : './config/keyfile.json'

});
var bucket = gcs.bucket('duckmate');
*/

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


/**************** Stream douwnload ver ******************/
/*var remoteFile = bucket.file('test01.png');
var localFilename = './photos/test01.png';

remoteFile.createReadStream()
	.on('error', function(err) {console.log("err",err);})
	.on('response', function(response) {
		console.log("response.status",response.status);
	// Server connected and responded with the specified status and headers.
	})
	.on('end', function() {
		console.log("end");
	// The file is fully downloaded.
	})
	.pipe(fs.createWriteStream(localFilename));*/

/******************************************************/


/**************** Stream upload ver ******************/

	//pipe : 받아서 넘겨주는 것 pipe속에 있는 것 바꾸면된다.
	// 리눅스에서 앞 결과 값 받아서 바로 전달 앞에값 리턴값을 메모리 그대로 뒤에 전해준다.
	//createWriteStream을 햇을 때 그대로 보내준다
	// 사용자에게 보내는 createStream해서 보내면 된다.


//그냥 여기서 createStream부분으로 하기
//default는 private이고 못바꾸기에 public으로 하기 -> 용도에 따라서
// fs.createReadStream('/Users/stephen/Photos/birthday-at-the-zoo/panda.jpg')
//   .pipe(file.createWriteStream({
//     metadata: {
//       contentType: 'image/jpeg',
//       metadata: {
//         custom: 'metadata'
//       }
//     }
//   }))
//   .on('error', function(err) {})
//   .on('finish', function() {
//     // The file upload is complete.
//   });

/**************************************************/


/*
module.exports = router;
*/
// automator 연동 api
