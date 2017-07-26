

/*******img올리기 위해 필요한 것들 ********/
 var fs = require('fs');
var imagePath = "./public/images";
var multer  = require('multer');
var upload = multer({ dest: './uploads/'});

var Q = require("q");
/************************************/



var express = require('express');
var router = express.Router();
var app = express();
var upload = function (req, res) {
    console.log("##",req.file);
  var deferred = Q.defer();
  var storage = multer.diskStorage({
    // 서버에 저장할 폴더
    destination: function (req, file, cb) {
      cb(null, imagePath);
    },

    // 서버에 저장할 파일 명
    filename: function (req, file, cb) {
      file.uploadedFile = {
        name: req.params.filename,
        ext: file.mimetype.split('/')[1]
      };
      cb(null, file.uploadedFile.name + '.' + file.uploadedFile.ext);
    }
  });

  var upload = multer({ storage: storage }).single('file');
  upload(req, res, function (err) {
    if (err) deferred.reject();
    else deferred.resolve(req.file.uploadedFile);
  });
  return deferred.promise;
};


router.post('/:filename', function(req, res, next) {
    upload(req, res).then(function (file) {
        res.json(file);
    }, function (err) {
        res.sendStatus(500).send(err);
    });
});



// TODO 이거는 다시 풀어ㅑㅇ한다


// router.post('/',function(req, res, next){
// // db에서 notnull인 것 없을 때 예외처리 다 해야한다
//
// // member_img,member_email,member_passwd, member_name
// // member_img은 member_email로 이름을 만든다.
//
//
//     pool.getConnection(function(error, connection){
//         if (error){
//                 console.log("getConnection Error" + error);
//                 res.sendStatus(500);
//         }
//         var sql = 'insert into duckmate.member(member_email, member_passwd, member_name) values(?,?,?)';
//         var inserts = [ req.body.member_email, req.body.member_passwd, req.body.member_name];
//         connection.query(sql, inserts, function(error, rows){
//             connection.release();
//             if (error){
//               console.log("register에서 post / Connection Error" + error);
//               res.status(500);
//             }
//             console.log( rows );
//         	if( rows.length === 0 ){
//         		res.status(201).send({result: false});
//         	}else{
//                 res.status(201).send({result : true});
//         	}
//         });//connection query
//
//     });
// });

// TODO 비밀번호 찾고싶은 사람 표시해주기

router.get('/:member_email', function(req, res, next) {
    pool.getConnection(function(error, connection){
        if (error){
            console.log("getConnection Error" + error);
            res.sendStatus(500);
        }
        var CheckMemberName = "SELECT * FROM duckmate.member where member_email = ? ;"
        connection.query(CheckMemberName,[ req.params.member_email ], function(error, rows){
            connection.release();
            if (error){
              console.log("register에서 get /:member_email Connection Error" + error);
              res.sendStatus(500);
            }

            console.log("rows는",rows[0]);


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
