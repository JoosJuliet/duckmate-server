var express = require('express');
var router = express.Router();
var app = express();



//member_id로
//UPDATE 테이블명 SET 바꿀것  WHERE 조건 Class=10
// 서브가수삭제




router.delete('/memberDelete', function(req, res, next) {

    var MemberId = req.body.member_id;
    pool.query('delete from duckmate.member where member_id=?;', [MemberId], function(error, results, fields) {
        if (error) {
            console.log("/memberDelete Error" + error);
            res.sendStatus(500).send({
                data: {},
                result: "/memberDelete에서 db pool error"
            });
            return;
        } // error
        res.status(201).send({
            data: {},
            result: "success"
        });

        return;
    });

}); // :member_name


router.get('/', function(req, res, next) {
    console.log("time" + Date.now());
    res.send('depromeet');
});



module.exports = router;
