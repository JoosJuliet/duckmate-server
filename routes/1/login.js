
var express = require('express');
var router = express.Router();
var app = express();
var fs = require('fs');
var multer = require('multer');
var upload = multer({ dest : 'upload/' })
const Storage = require('@google-cloud/storage');

console.log("hi");

var exit_flag = false;

fs.watch(__filename, (eventType, filename) => {
    if( exit_flag )return;
    exit_flag = true;
    if( eventType ==  'rename' || eventType ==  'change' ){
        setTimeout(()=>{
            process.exit();
        },2000);
    }
});




router.post('/', function(req, res, next){
    var BodyEmail = req.body.email; var BodyPasswd = req.body.passwd;
    var Rows_memberid; var Rows_b_vote_count; var Rows_singerb_id;
    pool.getConnection(function(error, connection){
        if (error){
            console.log("getConnection Error" + error);
            res.sendStatus(500);
        }

        var SelectEmailPasswdQry = 'select member_id  from duckmate.member where member_email =? and member_passwd =?';
        connection.query( SelectEmailPasswdQry ,[BodyEmail, BodyPasswd], function(error, rows){
            if (error){
              console.log("email,passwd Connection Error" + error);
              res.sendStatus(500).send({ result : "db error" });
            }

    		if(rows.length == 0){
    			res.status(201).send(
                    {
                        data : "member data",
                        message: "success",
                        result: false
                    }
                );
                return
    		}

            var RowsMemberId = rows[0].member_id;
            console.log("RowsMemberId는 ",RowsMemberId);

            var dectect_b_vote_count_qry = 'select b_vote_count from duckmate.mylist where member_id = ?';
            connection.query(dectect_b_vote_count_qry,[RowsMemberId], function(error, rows) {
                if (error){
                  console.log("dectect_b_vote_count_qry Connection Error" + error);
                  res.sendStatus(500).send({ result : "db error" });
                }
                if(rows.length == 0){
        			res.status(201).send(
                        {
                            data : "no b_vote_count data",
                            message: "success",
                            result: false
                        }
                    );
                    return
        		}

                var BVoteCount = rows[0].b_vote_count;
                console.log("rows[0].b_vote_count는" , BVoteCount);

                var SingerInfoQry = "select singer_name, album_img, choice_count from duckmate.singer where singer_id = ?;"
                connction.query(SingerInfoQry,[BVoteCount], function(error, rows) {
                    connection.release();
                    if (error){
                      console.log("SingerInfoQry Connection Error" + error);
                      res.sendStatus(500).send({ result : "SingerInfoQry db error" });
                    }
                    if(rows.length == 0){
            			res.status(201).send(
                            {
                                data : "no singer_name,album_image,choice_count data",
                                message: "success",
                                result: false
                            }
                        );
                        return
            		}
                    console.log("singer정보들",rows[0]);

                });



            }); //dectect_b_vote_count_qry




        });//SelectEmailPasswdQry

    });
})



module.exports = router;
