var express = require('express');
var router = express.Router();
var app = express();
//
// const responseToJson = (...args) => {
//     console.log(args);
//     var json = {
//         result : r,
//         msg : m,
//         data : d
//     };
//     if( !d ) delete json.data;
//     return ;
// };
// responseToJson(1,1,1);

/*******img올리기 위해 필요한 것들 ********/
var fs = require('fs');
var imagePath = "public/images";
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
var Q = require("q");
/************************************/


router.post('/',function(req, res, next){
    console.log("1");
    res.status(201).send(
        { result: false }
    );
// db에서 notnull인 것 없을 때 예외처리 다 해야한다

// member_img,member_email,member_passwd, member_name
// member_img은 member_email로 이름을 만든다.

});

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


            if( rows[0] == undefined ){
                res.status(201).send(
                    { result: false }
                );
                return
            }

            res.status(201).send(
                { result: true }
            );
            return


        });// connection
    });// pool
}); // :member_name



module.exports = router;
