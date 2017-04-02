var express = require('express');
var mysql = require('mysql');
var multer = require('multer');
var fs = require('fs');
var db_config = require('../config/db_config.json');
var router = express.Router();
var exit_flag = false;


var pool = mysql.createPool({
  host : db_config.host,
  port : db_config.port,
  user : db_config.user,
  database : db_config.database,
  connectionLimit : db_config.connectionLimit
});


console.log(1);
fs.watch(__filename, (eventType, filename) => {
console.log( 1);
    if( exit_flag )return;
    exit_flag = true;
console.log( 3, eventType );
    if( eventType ==  'rename' || eventType ==  'change' ){
console.log( 2);
        setTimeout(()=>{
            process.exit();
        },2000);
    }
});
      

Object.defineProperty(global, '__stack', {
    get: function(){
        var orig = Error.prepareStackTrace;
        Error.prepareStackTrace = function(_, stack){ return stack; };
        var err = new Error;
        Error.captureStackTrace(err, arguments.callee);
        var stack = err.stack;
        Error.prepareStackTrace = orig;
        return stack;
    }
});

Object.defineProperty(global, '__line', {
    get: function(){
        return __stack[1].getLineNumber();
    }
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
      connection.query('select * from singer order by choice_count desc', function(error, rows){
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


module.exports = router;
