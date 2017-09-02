/*******img올리기 위해 필요한 것들 ********/
const fs = require('fs');
const imagePath = "./public";
const multer  = require('multer');
const Q = require("q");
/************************************/

// var upload = multer({ dest: './uploads/'});

const express = require('express');
const router = express.Router();
const app = express();

/*******img 보내기 위해 필요한 것들 ********/
const gcs = require('@google-cloud/storage')({
	projectId: 'defflee-162207',
	keyFilename : './config/keyfile.json'
});
const mybucket = gcs.bucket('duckmate');

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
const serviceAccount = require('../../../config/firebase_config.json');
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});
// 우리것이면 email,비밀번호도 주고
// uid만 주고

// sns면 없다.
// sns가 아니면 notSns :true
// 닉네임은 무조건 받고


router.route('/id')
.get((req, res)=>{
	pool.query( 'select * from duckmate.member ', [ req.query.uid ] , function( err, rows ) {

		// 'select FirebaseToken from duckmate.member where firebaseUid = ?', [ req.query.uid ] , function( err, rows ) {
		if (err){
			console.log(err);
			res.json({
				result: false,
				msg: "db 접속 에러",
				qry: this.sql
			});
			return;
		}
		console.log('rows',rows);
		console.log('rows[0]',rows[0]);
		// console.log('rows[0].FirebaseToken',rows[0].FirebaseToken);
		if( rows.length === 1 ){
			res.status(201).json({
				result: true,
				msg: "firebasToken입니다.",
				data : rows[0]
			});
		}else{
			res.status(201).json({
				result: false,
				msg: "firebasToken이 없습니다",
			});
			return;
		}
	});

});


router.route('/')
.post((req, res)=>{
    const uid = req.body.uid;
    let properties = ['uid','member_name'];
    for(let i=0; i< properties.length;i++){
        if(!req.body.hasOwnProperty(properties[i])){
            res.json({
                result: false,
                msg: "req.body."+properties[i]+"이 없습니다."
            });
            return;
        }
    }
	pool.query( 'select 1 from duckmate.member where firebaseUid = ?', [ uid ] , function( err, rows ) {
		if (err){
			res.json({
				result: false,
				msg: "db 접속 에러",
				qry: this.sql
			});
			return;
		}

		console.log(rows);
		if( rows.length !== 0 ){
			res.status(201).json({
				result: false,
				msg: "이미 등록된 uid입니다.",
				token : "temp"
			});
			return;
		}else{
			let FirebaseToken;
			admin.auth().createCustomToken(uid)
			.then( customToken =>  tmp(customToken) )
		  	.catch((error) => {
				console.log(error+Date.now());
				res.json({
					result: false,
					msg: "토큰이 발급을 실패했습니다.",
					data: error
				});
		        return;
			});

		    const tmp = (FirebaseToken) => {

				console.log("$",FirebaseToken);


				if( !req.body.notSns )
		            SnsQry(FirebaseToken);
		        else
		        {
		            let properties = ['member_email','member_passwd'];
		            for(let i=0; i< properties.length;i++){
		                if(!req.body.hasOwnProperty(properties[i])){
		                    res.json({
		                        result: false,
		                        msg: "req.body."+properties[i]+"이 없습니다."
		                    });
		                    return;
		                }
		            }
		            let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		        	if(!regEmail.test(req.body.member_email)) {
		        		res.json({
		                    result: false,
		                    msg: "email 형식이 틀렸습니다."
		                });
		        		return;
		        	}
		            notSnsQry(FirebaseToken);
		        }
		    };

		    const SnsQry = (FirebaseToken) =>{
		        pool.query( 'insert ignore into duckmate.member( firebaseToken, member_name, firebaseUid ) values(?,?,?)', [ FirebaseToken ,  req.body.member_name, uid ] , function( err, results ) {
		            if (err){
		                res.json({
		                    result: false,
		                    msg: "db 접속 에러",
		                    qry: this.sql
		                });
		                return;
		            }
		            if( results.affectedRows === 1 ){
		                console.log("!!!!!");
		                console.log("FirebaseToken",FirebaseToken);
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
		                return;
		            }
		        });
		    };

		    const notSnsQry = (FirebaseToken) => {
		        pool.query( 'insert ignore into duckmate.member(firebaseToken,member_email, member_passwd, member_name) values(?,?,?,?);', [ FirebaseToken ,req.body.member_email, req.body.member_passwd, req.body.member_name ] , function( err, results ) {
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
		                        firebasToken : FirebaseToken
		                    }
		                });
		            }else{
		                res.status(201).json({
		                    result: false,
		                    msg: "업데이트를 실패했습니다.",
		                });
		                return;
		            }
		        });
		    };
		}
	});

})
.get((req, res)=>{

    if(!req.query.member_name){
        res.status(500).json({
            result: false,
            msg: "req.query.member_name이 없습니다."
        });
        return;
    }
	console.log('nonono');
    pool.query('SELECT * FROM duckmate.member where member_name = ?;', [ req.query.member_name ] , function( err, rows ) {
        if (err){
    		console.log(err);
    		res.status(500).json({
                result: false,
                msg: "db 접속 에러",
                qry: this.sql
            });
            return;
        }
	    console.log(rows,this.sql);
        if( rows.length === 0 ){
			res.status(200).json({
                result: true,
                msg: "member_name이 없습니다.",
            });
        }else{
			res.status(200).json({
                result: false,
                msg: "member_name이 있습니다.",
            });
        }
    });
}); // :member_name



module.exports = router;
