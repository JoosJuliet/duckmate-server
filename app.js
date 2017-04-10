var express = require('express');
var mysql = require('mysql');

var multer = require('multer');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var db_config = require('./config/db_config.json');




global.pool = mysql.createPool({
  host : db_config.host,
  port : db_config.port,
  user : db_config.user,
  database : db_config.database,
  connectionLimit : db_config.connectionLimit
});




var duckmate = require('./routes/duckmate');




var users = require('./routes/users');
var count = require('./routes/count');
var singer = require('./routes/singer');
var mainpage = require('./routes/mainpage');
var mypage = require('./routes/mypage');


var login = require('./routes/1/login');
var register = require('./routes/1/register');
var sns = require('./routes/1/sns');
var FindPassWord = require('./routes/1/findpassword');

var question = require('./routes/question');
var notice = require('./routes/notice');


var app = express();

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


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

console.log("app.js time",Date.now());
app.use('/duckmate', duckmate);
app.use('/duckmate/users', users);
app.use('/duckmate/count', count);
app.use('/duckmate/singer', singer);
app.use('/duckmate/mainpage', mainpage);
app.use('/duckmate/mypage', mypage);


// cd ./routes/1
app.use('/duckmate/login', login);
app.use('/duckmate/sns', sns);
app.use('/duckmate/register', register);
app.use('/duckmate/findpassword',FindPassWord);



// cd ./routes/2

app.use('/duckmate/question', question);
app.use('/duckmate/notice', notice);


//app.use('/duckmate/test', test);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
