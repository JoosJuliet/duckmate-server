var express = require('express');
var mysql = require('mysql');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var db_config = require('./config/db_config.json');
// MySQL 연동
var connectionLimit = 50;
//db connection 몇개 남았는 지 알려줘서 보내는 코드

global.pool = mysql.createPool({
    host : db_config.host,
    port : db_config.port,
    user : db_config.user,
	password : db_config.password,
    database : db_config.database,
    connectionLimit : db_config.connectionLimit
});

var LeftConnections = connectionLimit;
pool.on('acquire', function (connection) {
    LeftConnections--;
    if( LeftConnections < 5 ){
        console.log("DB Connections이 5개 밖에 남지 않았습니다!");
    }
});

pool.on('enqueue', function () {
    console.log("DB Connections이 고갈됨");

});

pool.on('release', function (connection) {
    LeftConnections++;
});

pool.getConnection(function(err, connection) {
    if( err ){
        console.log("error 처리",err);
        return;
    }

    connection.ping(function (err) {
        if (err) throw err;
        console.log('Server responded to ping');
    });
});
// TEST
var duckmate = require('./routes/duckmate');



var users = require('./routes/users');
var singer = require('./routes/singer');
var mainpage = require('./routes/mainpage');
var mypage = require('./routes/mypage');


var login = require('./routes/1/login');
var register = require('./routes/1/register');
var sns = require('./routes/1/sns');
var FindPassWord = require('./routes/1/findpassword');

var question = require('./routes/question');
var notice = require('./routes/notice');

var alarm = require('./routes/alarm');

var program = require('./routes/program');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
app.use( bodyParser.json({limit: '50mb'}) );
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit:50000
}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

console.log("app.js time",Date.now());
app.use('/duckmate', duckmate);
app.use('/duckmate/users', users);
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

app.use('/duckmate/alarm',alarm);
app.use('/duckmate/program',program);

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
	console.log("1");
    // render the error page
    res.status(err.status || 500);
    res.render('error');
	req.emit('error', err);
});

module.exports = app;
