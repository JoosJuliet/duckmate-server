
var express = require('express');
var router = express.Router();

var app = express();

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


    // pool.getConnection(function(error, connection){
    //     if (error){
    //         console.log("getConnection Error" + error);
    //         res.sendStatus(500);
    //     }
    //     var CheckMemberName = "SELECT member_name FROM duckmate.member where member_email =? ;"
    //     connection.query(CheckMemberName,[req.params.member_email], function(error, rows){
    //         connection.release();
    //         if (error){
    //           console.log("Connection Error" + error);
    //           res.sendStatus(500);
    //         }
    //
    //         console.log("rows는",rows[0]);
    //
    //         if( rows[0].length != 0){
    //             res.status(201).send(
    //                 { result: false}
    //             );
    //         }
    //         res.status(201).send(
    //             { result: true }
    //         );
    //         return
    //
    //
    //     });// connection
    // });// pool




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
