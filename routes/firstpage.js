var express = require('express');
var mysql = require('mysql');

var fs = require('fs');
var db_config = require('../config/db_config.json');
var router = express.Router();

router.get('/:member_id', function(req, res, next) {
    var ParamsMemberId = req.params.member_id;

    pool.getConnection(function(error, connection) {

        var InsertValueQry = 'SELECT member_img,member_name,member_level FROM duckmate.member where member_id = ?;';
        connection.query(InsertValueQry, [ParamsMemberId], function(error, result) {

            var SingerValueQry = 'SELECT singerb_id,singer0_id, singer1_id,singer2_id,singer3_id FROM duckmate.mylist where member_id = ? ;';
            connection.query(SingerValueQry, [ParamsMemberId], function(error, result0) {

                var NotUndefinedSigner = [];
				console.log(result0);
				console.log('111111');
				console.log(result0[0]);

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

                var SingerNameFlagQry = 'SELECT singer_name,new_flag FROM duckmate.singer where singer_id = ? ;';

                var SingerDb = (element, y) => {
                    connection.query(SingerNameFlagQry, [NotUndefinedSigner[y]], function(error, result1) {
                        sendData.singer.push(result1[0]);
                    }); //SingerNameFlagQry connection
                }
				console.log(result1);
                NotUndefinedSigner.forEach(SingerDb);

                res.status(200).send({result : true, message : true,  nevi_data: sendData});

                return

            }); //SingerValueQry connection

        }); //InsertValueQry connection
    }); // pool

}); //post

module.exports = router;
