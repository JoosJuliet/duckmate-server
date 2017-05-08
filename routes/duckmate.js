
var express = require('express');
var router = express.Router();

var app = express();

console.log("hi");


router.delete('/member_id', function(req, res, next) {

    console.log( req.body.member_id );
    pool.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
      if (error) throw error;
      console.log('The solution is: ', results);
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
