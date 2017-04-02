var express = require('express');
var router = express.Router();
var multer = require('multer');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host : 'host',
    user : 'user',
    password : 'pw',
    database : 'db'
});

var s3 = require( 'multer-storage-s3' );
var storage = s3({
	destination : function( req, file, cb ) {
		cb( null, 'file/' );
		
	},
	filename    : function( req, file, cb ) {
		cb( null, Date.now() + "." + file.originalname.split('.').pop() );
	},
	bucket : 'bucket_name',
	region : 'ap-northeast-2'
});
var upload = multer({ storage: storage });

router.get("/",function (req, res) {
    res.render('fileup', function (error, content) {
        if (!error) {
            res.end(content);
        }
        else {
            res.writeHead(501, { 'Content-Type' : 'text/plain' });
            res.end("Error while reading a file");
        }
    });
});


router.post( '/upload', upload.single('userPhoto'), function( req, res, next ) {
	var file_name = req.file.filename;
	var file_path = req.file.s3.Location;
	connection.query('INSERT INTO file ( filename, path ) VALUES ( ?, ? ) ;', [ file_name, file_path ], function (error, info) {
        if (error != undefined)
        	res.sendStatus(503);
		else
			res.send('File was Uploaded Successfully');
        	});
});


module.exports = router;