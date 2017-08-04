var express = require('express');
var mysql = require('mysql');

var fs = require('fs');
var db_config = require('../config/db_config.json');
var router = express.Router();

router.get('/:member_id/:singer_id', function(req, res, next) {
    var ParamsMemberId = req.params.member_id;
    var ParamsSingerId = req.params.singer_id;
    pool.getConnection(function(error, connection) {

        var InsertValueQry = 'SELECT member_img,member_name,member_level FROM duckmate.member where member_id = ?;';
        connection.query(InsertValueQry, [ParamsMemberId], function(error, result) {

            var SingerValueQry = 'SELECT singerb_id,singer0_id, singer1_id,singer2_id FROM duckmate.mylist where member_id = ? ;';
            connection.query(SingerValueQry, [ParamsMemberId], function(error, result0) {

				var votedataQry = 'SELECT singer.singer_name, singer.singer_img, singer.choice_count, A.b_vote_count from (select mylist.b_vote_count from duckmate.mylist where member_id=?) as A, duckmate.singer  where singer.singer_id=?';

                var NotUndefinedSigner = [];

                var singerArr = ["singerb_id", "singer0_id", "singer1_id", "singer2_id"];
                for (var x = 0; x < singerArr.length; x++) {
                    var Singerb_id = result0[0][singerArr[x]];
                    if (Singerb_id) {
                        NotUndefinedSigner.push(Singerb_id);
                    }
                }

//				var singerb = result0[0][singerArr[0]];

				connection.query(votedataQry, [ParamsMemberId, ParamsSingerId], function(error, voteresult) {
					
		//			console.log(voteresult[0].singer_name);

					var singerb_name = voteresult[0].singer_name;
					var chartQry1 = 'SELECT singer.song_name, singer.album_name FROM singer WHERE singer.singer_id=?';

					connection.query(chartQry1, [ParamsSingerId], function(error, chartresult1) {
				
							
							var chartQry2 = "SELECT chart_sample.idx, chart_sample.is_up FROM chart_sample WHERE chart_sample.singer_name=?";							
							connection.query(chartQry2, [singerb_name], function(error, chartresult2) {
								
								var chartData = {
									song_name : chartresult1[0].song_name,
									album_name : chartresult1[0].album_name,
									melonchart : chartresult2
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

										sendData.singer.push(result1[0]);
										check.push("1");
										return Check();

									}); //SingerNameFlagQry connection
								}

								NotUndefinedSigner.forEach(SingerDb);

								var Check = () => {
									if (check.length == NotUndefinedSigner.length) {
										res.status(200).send({result : true, message : true, vote_data : voteresult[0], chart_data : chartData, nevi_data : sendData});
									}
								}

								return
							});//chartQry2 connection
					}); //chartQry1 connection
				}); //votedataQry connection

            }); //SingerValueQry connection

        }); //InsertValueQry connection
    }); // pool

}); //post

module.exports = router;
