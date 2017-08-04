


/*******img올리기 위해 필요한 것들 ********/
 var fs = require('fs');
var imagePath = "./public";
var multer  = require('multer');
var Q = require("q");
/************************************/

// var upload = multer({ dest: './uploads/'});

var express = require('express');
var router = express.Router();
var app = express();

/*******img 보내기 위해 필요한 것들 ********/
var gcs = require('@google-cloud/storage')({
	projectId: 'defflee-162207',
	keyFilename : './config/keyfile.json'
});
var mybucket = gcs.bucket('duckmate');

/************************************/


var upload = function (req, res) {
    console.log("req.params.filename",req.params.filename); //test
    var deferred = Q.defer();
    var storage = multer.diskStorage({
        // 서버에 저장할 폴더
        destination: function (req, file, cb) {
            console.log("2");
            cb(null, imagePath);
        },

        // 서버에 저장할 파일 명
        filename: function (req, file, cb) {
            console.log("!!req.params.filename",req.params.filename);
            file.uploadedFile = {
                name: req.params.filename,
                ext: file.mimetype.split('/')[1]
            };
            cb(null, file.uploadedFile.name + '.' + file.uploadedFile.ext);
        }
    });

    var upload = multer({ storage: storage }).single('file');
    upload(req, res, function (err) {
        if (err) {
            console.log("err",err);
            deferred.reject();
        } else {
            deferred.resolve(req.file.uploadedFile);
        }
    });
    return deferred.promise;
};


router.post('/fileupload/:filename', function(req, res, next) {
    upload(req, res).then(function (file) {
        res.json(file);
    }, function (err) {
        res.sendStatus(500).send(err);
    });
});




const admin = require("firebase-admin");
const serviceAccount = require('../../config/firebase_config.json');
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});
// 우리것이면 email,비밀번호도 주고
// uid만 주고

// sns면 없다.
// sns가 아니면 notSns :true
// 닉네임은 무조건 받고

router.post('/',function(req, res, next){
    const uid = req.body.uid;
    if( !req.body.uid ){
        res.json({
            result: false,
            msg: "req.body.uid이 없습니다."
        });
        return;
    } else if( !req.body.member_name ){
        res.json({
            result: false,
            msg: "req.body.member_name이 없습니다."
        });
        return;
    }

    let FirebaseToken;

	admin.auth().createCustomToken(uid)
	.then(function(customToken) {
	
			console.log(customToken);
			tmp(customToken);
			FirebaseToken = customToken;
	})
  	.catch(function(error) {
		console.log(error+Date.now());
		res.json({
			result: false,
			msg: "토큰이 발급을 실패했습니다.",
			data: error
		});
        return;
	});

const tmp = (FirebaseToken) => {
    if( req.body.notSns ){
        if( !req.body.member_email ){
            res.json({
                result: false,
                msg: "req.body.member_email이 없습니다."
            });
            return;
        }else if ( !req.body.member_passwd ) {
            res.json({
                result: false,
                msg: "req.body.member_passwd이 없습니다."
            });
            return;
        }

        pool.query( 'insert into duckmate.member(firebaseToken,member_email, member_passwd, member_name,member_id) values(?,?,?,?,1);',
        [ FirebaseToken ,req.body.member_email, req.body.member_passwd, req.body.member_name ] , function( err, results ) {
            if (err){ 
				console.log(err);
                res.json({
                    result: false,
                    msg: "db 접속 에러",
                    qry: this.sql
                });
                return;
            }
            console.log('results',results);
            if( results.affectedRows === 1 ){
                res.status(201).json({
                    result: true,
                    msg: "업데이트가 완료되었습니다.",
                    data : {
                        firebasToken : FirebaseToken,
                        member_id : results.insertId
                    }
                });
            }else{
                res.status(201).json({
                    result: false,
                    msg: "업데이트를 실패했습니다.",
                });
            }
        });

    }else{

        pool.query( 'insert into duckmate.member( firebaseToken, member_name ) values(?,?)', [ FirebaseToken ,  req.body.member_name ] , function( err, results ) {
            if (err){
                res.json({
                    result: false,
                    msg: "db 접속 에러",
                    qry: this.sql
                });
                return;
            }

            if( results.affectedRows === 1 ){
                res.status(201).json({
                    result: true,
                    msg: "업데이트가 완료되었습니다.",
                    data : FirebaseToken
                });
            }else{
                res.status(201).json({
                    result: false,
                    msg: "업데이트를 실패했습니다.",
                });
            }
        });
    }

};
});

// TODO 비밀번호 찾고싶은 사람 표시해주기

router.get('/:member_email', function(req, res, next) {
    pool.getConnection(function(error, connection){
        if (error){
            console.log("getConnection Error" + error);
            res.sendStatus(500);
        }
        let CheckMemberName = "SELECT * FROM duckmate.member where member_email = ? ;"
        connection.query(CheckMemberName,[ req.params.member_email ], function(error, rows){
            connection.release();
            if (error){
              console.log("register에서 get /:member_email Connection Error" + error);
              res.sendStatus(500);
            }

            if( rows[0] === undefined ){
                res.status(201).send(
                    { result: false }
                );
                return;
            }

            res.status(201).send(
                { result: true }
            );
            return;


        });// connection
    });// pool
}); // :member_name



module.exports = router;
