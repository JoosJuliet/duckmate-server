
var express = require('express');
var router = express.Router();

var app = express();


router.delete('/singerDelete', function(req, res, next) {

    var MemberId = req.body.member_id;
    var SingerId = req.body.singer_id;
    pool.query('delete from duckmate.member where member_id=?;',[ MemberId ], function (error, results, fields) {
        if (error){
          console.log("/memberDelete Error" + error);
          res.sendStatus(500).send({
              data : {},
              result : "/memberDelete에서 db pool error"
          });
        }// error
        console.log('The solution is: ', results);
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
        console.log('The solution is: ', results);
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

console.log("right");


module.exports = router;
