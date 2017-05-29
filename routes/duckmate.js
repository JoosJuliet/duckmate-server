
var express = require('express');
var router = express.Router();
var app = express();


/*이미지 업로드 */
var Q = require("q");
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
// var imagePath = "../photos/images";

router.post('/filename' , upload.single('avatar')  , ( req,res ,next)=>{

            console.log("err", next(err));

    console.log("req.file", req.file);
    console.log("req.body", req.body);
    res.status(201).send(
        {
            data : {},
            result: "success"
        }
    );
});


//
// router.post('/:filename', function(req, res, next) {
//     var upload = function (req, res) {
//         var deferred = Q.defer();
//         var storage = multer.diskStorage({
//         // 서버에 저장할 폴더
//             destination: function (req, file, cb) {
//                 cb(null, imagePath);
//             },
//
//             // 서버에 저장할 파일 명
//             filename: function (req, file, cb) {
//                 file.uploadedFile = {
//                  name: req.params.filename,
//                     ext: file.mimetype.split('/')[1]
//                 };
//                cb(null, file.uploadedFile.name + '.' + file.uploadedFile.ext);
//             }
//         });
//
//         var upload = multer({ storage: storage }).single('file');
//         upload(req, res, function (err) {
//             if (err) {
//                 console.log("err",err);
//                 deferred.reject();
//             }else {
//                 deferred.resolve(req.file.uploadedFile);
//             }
//         });
//         return deferred.promise;
//     };
//     upload(req, res).then(function (file) {
//         res.status(200).json(file);
//     }, function (err) {
//         res.status(500).send(err);
//     });
// });


//member_id로
//UPDATE 테이블명 SET 바꿀것  WHERE 조건 Class=10
// 서브가수삭제

var SingerIdArr = ["b","0","1","2","3"];
router.delete('/singerDelete', function(req, res, next) {

    var MemberId = req.body.member_id; var SingerNum = req.body.singerNum;
    pool.query('UPDATE duckmate.mylist SET singer'+SingerIdArr[SingerNum]+'_id = null, '+SingerIdArr[SingerNum]+'_flag = null where member_id= ?;',[ MemberId ], function (error, results, fields) {
        if (error){
          console.log("/singerDelete Error" + error);
          res.sendStatus(500).send({
              data : {},
              result : "/singerDelete에서 db pool error"
          });
        }// error
        res.status(201).send(
            {
                data : {},
                message: "success",
                result: "success"
            }
        );

        return
    });

}); // :member_name


router.delete('/memberDelete', function(req, res, next) {

    var MemberId = req.body.member_id;
    pool.query('delete from duckmate.member where member_id=?;',[ MemberId ], function (error, results, fields) {
        if (error){
          console.log("/memberDelete Error" + error);
          res.sendStatus(500).send({
              data : {},
              result : "/memberDelete에서 db pool error"
          });
        }// error
        res.status(201).send(
            {
                data : {},
                result: "success"
            }
        );

        return
    });

}); // :member_name


router.get('/', function(req, res, next) {
    console.log("time"+Date.now());
    res.send('depromeet');
});



module.exports = router;
