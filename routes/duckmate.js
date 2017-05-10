
var express = require('express');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
var router = express.Router();

var app = express();

app.post('/profile', upload.single('test.png'), function (req, res, next) {

    console.log(req.file);
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
})

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

/* GET home page. */
/*router.post('/',(req,res,next)=>{
console.log( 1 );
res.send('post');
});*/
router.get('/', function(req, res, next) {
console.log("time"+
Date.now());
         res.send('depromeet');
});



module.exports = router;
