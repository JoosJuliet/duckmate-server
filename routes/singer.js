var express = require('express');
var mysql = require('mysql');

var fs = require('fs');
var db_config = require('../config/db_config.json');
var router = express.Router();

// (mylist table) 해당가수의 투표count
//member_id로 찾고 거기에서 해당 singer_id에 맞는 id를 찾아서 그것의 vote_count를 잡느다.

// ( singer table )choice_count,singer_img,singer_name
//singer_id에서 choice_count,singer_img,singer_name


router.route('/')
.post((req, res)=>{
    // 가수들 처음 추가할 때 추가

    const properties = ['singer_id','singerNum','firebaseToken'];
    for(var i=0; i< properties.length;i++){
        if(!req.body.hasOwnProperty(properties[i])){
            res.json({
                result: false,
                msg: "req.body."+properties[i]+"이 없습니다."
            });
            return;
        }
    }
    pool.query('update duckmate.member SET singer' + req.body.singerNum + '_id = ? where firebaseToken = ?;', [ req.body.singer_id, req.body.firebaseToken] , function( err, results ) {
        if (err){
    		console.log(err);
    		res.status(500).json({
                    result: false,
                    msg: "db 접속 에러",
                    qry: this.sql
            });
            return;
        }
        if( results.affectedRows ){
            res.status(201).json({
                result: true,
                msg: "업데이트가 완료되었습니다.",
            });
        }else{
            res.status(200).json({
                result: false,
                msg: "업데이트를 실패했습니다.",
            });
        }
    });
})
.get((req,res)=>{

    if(!req.query.firebaseToken){
        res.json({
            result: false,
            msg: "req.query.firebaseToken이 없습니다."
        });
        return;
    }

    //내 가수들에 대한  singer_id,singer_name,singer_img,choice_count

})
.put((req,res)=>{
    //member_id와 몇번째 가수인지와 가수 id로

});







/*

router.get('/singerbase/:member_id', function(req, res, next) {
    // 그냥 싱어 id
    pool.getConnection(function(error, connection) {
        if (error) {
            console.log("getConnection Error" + error);
            res.sendStatus(500);
        } else {
            connection.query('SELECT singerb_id, singer0_id, singer1_id, singer2_id FROM duckmate.mylist where member_id = ? ;', [req.params.member_id], function(error, rows) {
                if (error) {
                    console.log("Connection Error" + error);
                    res.sendStatus(500);
                    connection.release();
                }
                console.log(rows);

                if ( rows[0].length ) {
                    res.status(200).send({result: "false"});
                    connection.release();
                    return;
                } else {
                    res.status(200).send({
                        result: "success",
                        data: {
                            singerb_id: rows[0].singerb_id,
                            singer0_id: rows[0].singer0_id,
                            singer1_id: rows[0].singer1_id,
                            singer2_id: rows[0].singer2_id
                        }

                    });
                    connection.release();
                    return;
                }

            });
        }
    });
});

*/

router.get('/singercheck/:member_id', function(req, res, next) {

    pool.getConnection(function(error, connection) {
        if (error) {
            console.log("getConnection Error" + error);
            res.sendStatus(500);
        } else {
            // 내 가수의 singer의 순서와 , singer정보들
            connection.query('select singer_id, singer_name, singer_img, choice_count from (select mylist.singerb_id, mylist.singer0_id, mylist.singer1_id, mylist.singer2_id from mylist where mylist.member_id=?)as A, singer where A.singerb_id=singer.singer_id or A.singer0_id=singer.singer_id or A.singer1_id=singer.singer_id or A.singer2_id=singer.singer_id', [req.params.member_id], function(error, rows) {
                if (error) {
                    console.log("Connection Error" + error);
                    res.sendStatus(500);
                    connection.release();
                } else {
                    res.status(200).send({result: rows});
                    connection.release();
                }
            });
        }
    });
});

router.get('/singer_rank', function(req, res, next) {
    pool.getConnection(function(error, connection) {
        if (error) {
            console.log("getConnection Error" + error);
            res.sendStatus(500);
        } else {
            connection.query('select singer_id, singer_name, singer_img from singer order by choice_count desc', function(error, rows) {
                if (error) {
                    console.log("Connection Error" + error);
                    res.sendStatus(500);
                    connection.release();
                } else {
                    res.status(200).send({result: rows});
                    connection.release();
                }
            });
        }
    });
});
//UPDATE [테이블] SET [열] = '변경할값' WHERE [조건]
//            /singer/singerAdd   -> 자신의 가수 추가시      singer_id, member_id,num

//where에서 member_id 에다가 singerb_id넣는다.



module.exports = router;
