var express = require('express');
var router = express.Router();
var app = express();



//member_id로
//UPDATE 테이블명 SET 바꿀것  WHERE 조건 Class=10
// 서브가수삭제

var SingerIdArr = ["b", "0", "1", "2", "3"];
router.delete('/singerDelete', function(req, res, next) {

    var MemberId = req.body.member_id;
    var SingerNum = req.body.singerNum;
    pool.query('UPDATE duckmate.mylist SET singer' + SingerIdArr[SingerNum] + '_id = null, ' + SingerIdArr[SingerNum] + '_flag = null where member_id= ?;', [MemberId], function(error, results, fields) {
        if (error) {
            console.log("/singerDelete Error" + error);
            res.sendStatus(500).send({
                result: false,
                message : "/singerDelete에서 db error",
                data: this.qry
            });
        } // error
        res.status(201).send({
            result: true,
            message: "singer가 delete 되었습니다.",
        });

        return;
    });

}); // :member_name


router.delete('/memberDelete', function(req, res, next) {

    var MemberId = req.body.member_id;
    pool.query('delete from duckmate.member where member_id=?;', [MemberId], function(error, results, fields) {
        if (error) {
            console.log("/memberDelete Error" + error);
            res.sendStatus(500).send({
                data: {},
                result: "/memberDelete에서 db pool error"
            });
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
