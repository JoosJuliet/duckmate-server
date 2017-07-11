var express = require('express');
var mysql = require('mysql');
var multer = require('multer');
var fs = require('fs');
var db_config = require('../config/db_config.json');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('singer', {title: 'singer'});
});

router.get('/singertest/:id', function(req, res, next) {
    res.send(req.params.id);
});



//
// (mylist table) 해당가수의 투표count
//member_id로 찾고 거기에서 해당 singer_id에 맞는 id를 찾아서 그것의 vote_count를 잡느다.

// ( singer table )choice_count,singer_img,singer_name
//singer_id에서 choice_count,singer_img,singer_name

var SingerIdArr = ["b", "0", "1", "2", "3"];
router.get('/mainpage/:member_id/:singer_id/:singerNum', function(req, res, next) {

    let singerNumParam = req.params.singerNum;
    let SingerNum = ""+SingerIdArr[singerNumParam] + "_vote_count";
    pool.getConnection(function(error, connection) {
        if (error) {
            console.log("getConnection Error" + error);
            res.sendStatus(500);
        } else {
            connection.query('select '+SingerNum+' from mylist where member_id = ?', [req.params.member_id], function(error, rows1) {
                if (error) {
                    console.log("Connection Error" + error);
                    res.sendStatus(500);
                    connection.release();
                } else {
                    console.log(rows1[0]);
                    connection.query('select choice_count,singer_img,singer_name from singer where singer_id = ?', [req.params.singer_id], function(error, rows) {
                        if (error) {
                            console.log("Connection Error" + error);
                            res.sendStatus(500);
                            connection.release();
                        } else {
                            res.status(200).send(
                                {
                                    "result": rows[0],
                                    "results" : rows1[0]
                                }
                            );
                            connection.release();
                        }
                    });

                }
            });




        }
    });
});

router.get('/singerinfo/:singer_id', function(req, res, next) {
    pool.getConnection(function(error, connection) {
        if (error) {
            console.log("getConnection Error" + error);
            res.sendStatus(500);
        } else {
            connection.query('select * from singer where singer_id = ?', [req.params.singer_id], function(error, rows) {
                if (error) {
                    console.log("Connection Error" + error);
                    res.sendStatus(500);
                    connection.release();
                } else {
                    res.status(200).send({result: rows[0]});
                    connection.release();
                }
            });
        }
    });
});

router.get('/singerinfo/:singer_id', function(req, res, next) {
    pool.getConnection(function(error, connection) {
        if (error) {
            console.log("getConnection Error" + error);
            res.sendStatus(500);
        } else {
            connection.query('select * from singer where singer_id = ?', [req.params.singer_id], function(error, rows) {
                if (error) {
                    console.log("Connection Error" + error);
                    res.sendStatus(500);
                    connection.release();
                } else {
                    res.status(200).send({result: rows[0]});
                    connection.release();
                }
            });
        }
    });
});

router.get('/singerbase/:member_id', function(req, res, next) {
    pool.getConnection(function(error, connection) {
        if (error) {
            console.log("getConnection Error" + error);
            res.sendStatus(500);
        } else {
            connection.query('SELECT singerb_id, singer0_id, singer1_id, singer2_id, singer3_id FROM duckmate.mylist where member_id = ? ;', [req.params.member_id], function(error, rows) {
                if (error) {
                    console.log("Connection Error" + error);
                    res.sendStatus(500);
                    connection.release();
                }

                if (rows[0] == undefined) {
                    res.status(200).send({result: "false"});
                    return
                    connection.release();
                } else {
                    res.status(200).send({
                        result: "success",
                        data: {
                            singerb_id: rows[0].singerb_id,
                            singer0_id: rows[0].singer0_id,
                            singer1_id: rows[0].singer1_id,
                            singer2_id: rows[0].singer2_id,
                            singer3_id: rows[0].singer3_id
                        }

                    });
                    connection.release();
                    return
                }

            });
        }
    });
});

router.get('/singercheck/:member_id', function(req, res, next) {
    pool.getConnection(function(error, connection) {
        if (error) {
            console.log("getConnection Error" + error);
            res.sendStatus(500);
        } else {
            connection.query('select singer.singer_id, singer.singer_name, singer.singer_img, singer.choice_count from (select mylist.singerb_id, mylist.singer0_id, mylist.singer1_id, mylist.singer2_id, mylist.singer3_id from mylist where mylist.member_id=?)as A, singer where A.singerb_id=singer.singer_id or A.singer0_id=singer.singer_id or A.singer1_id=singer.singer_id or A.singer2_id=singer.singer_id or A.singer3_id=singer.singer_id', [req.params.member_id], function(error, rows) {
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

var SingerIdArr = ["b", "0", "1", "2", "3"];
router.post('/singerAdd', function(req, res, next) {
    var BodySingerId = req.body.singer_id;
    var BodyMemberId = req.body.member_id;
    var BodyNum = req.body.singerNum;
    pool.getConnection(function(error, connection) {
        if (error) {
            console.log("getConnection Error" + error);
            res.sendStatus(500);
        }
        var SingerId = "singer" + SingerIdArr[BodyNum] + "_id";

        var InsertValueQry = 'update duckmate.mylist SET ' + SingerId + '= ? where (member_id = ?);';
        connection.query(InsertValueQry, [
            BodySingerId, BodyMemberId
        ], function(error, rows) {
            if (error) {
                console.log("InsertValueQry Connection Error" + error);
                res.sendStatus(500).send({result: "db error"});
            }

            if (rows.length == 0) {
                res.status(201).send({data: "member data", message: "success", result: false});
                return
            }
            res.status(200).send({data: "member data", message: "success", result: true});

        });
    }); // pool
}); //post

router.get('/tabpage/:member_id', function(req, res, next) {
    var ParamsMemberId = req.params.member_id;

    pool.getConnection(function(error, connection) {
        if (error) {
            console.log("getConnection Error" + error);
            res.sendStatus(500).send({result: "db pool error"});;
            return
        }

        var InsertValueQry = 'SELECT member_img,member_name,member_level FROM duckmate.member where member_id = ?;';
        connection.query(InsertValueQry, [ParamsMemberId], function(error, result) {
            if (error) {
                console.log("InsertValueQry Connection Error" + error);
                res.sendStatus(500).send({result: "db connection error"});
                return
            } // error

            if (result.length == 0) {
                res.status(201).send({data: "member data", message: "success", result: false});
                return
            } //없는 것 확인

            var SingerValueQry = 'SELECT singerb_id,singer0_id, singer1_id,singer2_id,singer3_id FROM duckmate.mylist where member_id = ? ;';
            connection.query(SingerValueQry, [ParamsMemberId], function(error, result0) {
                if (error) {
                    console.log("SingerValueQry Connection Error" + error);
                    res.sendStatus(500).send({result: "db connection error"});
                    return
                } // error

                if (result0.length == 0) {
                    res.status(201).send({data: "member data", message: "success", result: false});
                    return
                } //없는 것 확인

                var NotUndefinedSigner = [];

                var singerArr = ["singerb_id", "singer0_id", "singer1_id", "singer2_id", "singer3_id"];
                for (var x = 0; x < singerArr.length; x++) {
                    var Singerb_id = result0[0][singerArr[x]];
                    if (Singerb_id) {
                        NotUndefinedSigner.push(Singerb_id);
                    }
                }

                var sendData = {
                    member_img: result[0].member_img,
                    member_name: result[0].member_name,
                    member_level: result[0].member_level,
                    singer: []
                }

                var check = [];
                var SingerNameFlagQry = 'SELECT singer_name,new_flag FROM duckmate.singer where singer_id = ? ;';

                var SingerDb = (element, y) => {
                    connection.query(SingerNameFlagQry, [NotUndefinedSigner[y]], function(error, result1) {
                        if (error) {
                            console.log("SingerValueQry Connection Error" + error);
                            res.sendStatus(500).send({result: "db connection error"});
                        } // error

                        if (result1.length == 0) {
                            res.status(201).send({data: "member data", message: "success", result: false});
                            return
                        } //없는 것 확인
                        sendData.singer.push(result1[0]);
                        check.push("1");
                        return Check();

                    }); //SingerNameFlagQry connection
                }

                NotUndefinedSigner.forEach(SingerDb);

                var Check = () => {
                    if (check.length == NotUndefinedSigner.length) {
                        res.status(200).send({data: sendData, message: "success", result: "success"});
                    }
                }

                return

            }); //SingerValueQry connection

        }); //InsertValueQry connection
    }); // pool

}); //post

//tappage에서 하는일
// member_id로 - member table에서 member_img,member_name,member_level 그리고
// member_id로 -  mylist table에서 singerb_id,singer0_id, singer1_id,singer2_id,singer3_id 가져와서
// s_id이용해서 singer table에서 {singer_name,new_flag}

module.exports = router;
