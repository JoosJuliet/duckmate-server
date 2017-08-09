
const express         = require('express');
const router          = express.Router();

/**********************
        MySQL 연동
**********************/
const mysql           = require('mysql');
console.log(__dirname);
console.log( 
process.cwd() );

const db_config       = require(''+process.cwd()+'/config/db_config.json');
console.log(db_config);
const connectionLimit = 50;
//db connection 몇개 남았는 지 알려줘서 보내는 코드

global.pool = mysql.createPool({
    host : db_config.host,
    port : db_config.port,
    user : db_config.user,
	password : db_config.password,
    database : db_config.database,
    connectionLimit : db_config.connectionLimit
});

let LeftConnections = connectionLimit;
pool.on('acquire', function (connection) {
    LeftConnections--;
    if( LeftConnections < 5 ){
        console.log("DB Connections이 5개 밖에 남지 않았습니다!");
    }
	LeftConnections--;
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



/**********************
        Mongo 연동
**********************/






// android 관리
const android = require('./android');
router.use("/android",android);

/*
    admin 관리
    const admin = require('./admin');
    router.use("/admin",admin);
*/
/*
    ios 관리
    const ios = require('./ios');
    router.use("/ios",ios);
*/

module.exports = router;
