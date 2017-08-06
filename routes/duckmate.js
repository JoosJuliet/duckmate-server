var express = require('express');
var router = express.Router();
var app = express();


//TODO member관리도 해야함
router.delete('/memberDelete', function(req, res, next) {

    pool.query('delete from duckmate.member where firebaseToken=?;', [req.body.firebaseToken], function(error, results, fields) {
        if (error) {
            console.log("/memberDelete Error" + error);
            res.sendStatus(500).send({
                result: false,
                msg : "/memberDelete에서 db pool error",
                sql : this.sql
            });
            return;
        } // error
        if( results.affectedRows ){
            res.status(201).send({
                result: true,
                msg : "성공적으로 탈퇴되었습니다."
            });
        }else{
            res.status(201).send({
                result: false,
                msg : "탈퇴 실패!"
            });
        }

    });

}); // :member_name


router.get('/', function(req, res, next) {
    console.log("time" + Date.now());
    res.send('depromeet');
});



module.exports = router;
