var express = require('express');
var mysql = require('mysql');
var multer = require('multer');
var fs = require('fs');
var db_config = require('../config/db_config.json');
var router = express.Router();


var pool = mysql.createPool({
  host : db_config.host,
  port : db_config.port,
  user : db_config.user,
  database : db_config.database,
  connectionLimit : db_config.connectionLimit
});


router.get('/', function(req, res, next) {
  res.render('singer', { title: 'singer' });
});

router.get('/singertest/:id', function(req, res, next) {
  res.send(req.params.id);
});


router.get('/singerinfo/:singer_id', function(req, res, next) {
  pool.getConnection(function(error, connection){
    if (error){
      console.log("getConnection Error" + error);
      res.sendStatus(500);
    }
    else{
      connection.query('select * from singer where singer_id = ?',
       [req.params.singer_id], function(error, rows){
        if (error){
          console.log("Connection Error" + error);
          res.sendStatus(500);
          connection.release();
        }
        else {
          res.status(200).send({result : rows[0]});
          connection.release();
        }
      });
    }
  });
});

router.get('/singerbase/:member_id', function(req, res, next) {
  pool.getConnection(function(error, connection){
    if (error){
      console.log("getConnection Error" + error);
      res.sendStatus(500);
    }
    else{
      connection.query('select singerb_id, singer0_id, singer1_id, singer2_id, singer3_id from mylist where member_id = ?',
       [req.params.member_id], function(error, rows){
        if (error){
          console.log("Connection Error" + error);
          res.sendStatus(500);
          connection.release();
        }
        else {
          res.status(200).send({result : rows[0]});
          connection.release();
        }
      });
    }
  });
});


router.get('/singercheck/:member_id', function(req, res, next) {
  pool.getConnection(function(error, connection){
    if (error){
      console.log("getConnection Error" + error);
      res.sendStatus(500);
    }
    else{
      connection.query('select singer.singer_id, singer.singer_name, singer.singer_img, singer.choice_count from (select mylist.singerb_id, mylist.singer0_id, mylist.singer1_id, mylist.singer2_id, mylist.singer3_id from mylist where mylist.member_id=?)as A, singer where A.singerb_id=singer.singer_id or A.singer0_id=singer.singer_id or A.singer1_id=singer.singer_id or A.singer2_id=singer.singer_id or A.singer3_id=singer.singer_id',
       [req.params.member_id], function(error, rows){
        if (error){
          console.log("Connection Error" + error);
          res.sendStatus(500);
          connection.release();
        }
        else {
          res.status(200).send({result : rows});
          connection.release();
        }
      });
    }
  });
});


router.get('/singer_rank', function(req, res, next) {
  pool.getConnection(function(error, connection){
    if (error){
      console.log("getConnection Error" + error);
      res.sendStatus(500);
    }
    else{
      connection.query('select singer_id, singer_name, singer_img from singer order by choice_count desc', function(error, rows){
        if (error){
          console.log("Connection Error" + error);
          res.sendStatus(500);
          connection.release();
        }
        else {
          res.status(200).send({result : rows});
          connection.release();
        }
      });
    }
  });
});
//UPDATE [테이블] SET [열] = '변경할값' WHERE [조건]
//            /singer/singerAdd   -> 자신의 가수 추가시      singer_id, member_id,num

//where에서 member_id 에다가 singerb_id넣는다.

var SingerIdArr = ["b","0","1","2","3"];
router.post('/singerAdd', function(req, res, next){
    var BodySingerId = req.body.singer_id; var BodyMemberId = req.body.member_id; var BodyNum = req.body.singerNum;
    pool.getConnection(function(error, connection){
        if (error){
            console.log("getConnection Error" + error);
            res.sendStatus(500);
        }
        var SingerId = "singer"+SingerIdArr[BodyNum]+"_id";

        var InsertValueQry = ' update duckmate.mylist SET '+SingerId+'= ? where (member_id = ?);';
        console.log(InsertValueQry);
        connection.query( InsertValueQry ,[ BodySingerId, BodyMemberId], function(error, rows){
            if (error){
              console.log("InsertValueQry Connection Error" + error);
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
            res.status(200).send({result : "success"});

        // });
    });// pool
});//post


module.exports = router;
