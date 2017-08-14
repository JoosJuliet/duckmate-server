var express = require('express');
var mysql = require('mysql');

var fs = require('fs');
var router = express.Router();

/*
router.get('/score/:Firebase' function(req, res, next){
	
	var ParamsFirebase = req.params.Firebase;

	pool.getConnection(function(error, connection){
	
		var ScoreQry = 'update member set member_score=member_score+1 where firebaseToken = ? ';
		
		connection.query(ScoreQry, [ParamsFirebase], function(error, result){
		
			res.status(200).send(result : true);		
		
				
				
		});
			
			
	});	
		
});

*/

router.get('/:Firebase/:singer_id', function(req, res, next) {
    var ParamsFirebase = req.params.Firebase;
	var ParamsSingerId = req.params.singer_id;
	
	pool.getConnection(function(error, connection) {

        var InsertValueQry = 'SELECT member_name, member_img, member_level FROM duckmate.member where firebaseToken = ?;';
        connection.query(InsertValueQry, [ParamsFirebase], function(error, result) {
		 console.log(result);

            var SingerValueQry = 'SELECT singer0_id,singer1_id, singer2_id,singer3_id FROM duckmate.member where firebaseToken = ? ;';
            connection.query(SingerValueQry, [ParamsFirebase], function(error, result0) {
				console.log(result0);
				var votedataQry = 'SELECT singer.singer_name, singer.singer_img, singer.choice_count, A.0_vote_count from (select member.0_vote_count from duckmate.member where firebaseToken=?) as A, duckmate.singer  where singer.singer_id=?';

                var NotUndefinedSigner = [];

                var singerArr = ["singer0_id", "singer1_id", "singer2_id", "singer3_id"];
                for (var x = 0; x < singerArr.length; x++) {
                    var Singerb_id = result0[0][singerArr[x]];
                    if (Singerb_id) {
                        NotUndefinedSigner.push(Singerb_id);
                    }
                }

			//	var singerb_id = result0[0][singerArr[0]];

				connection.query(votedataQry, [ParamsFirebase, ParamsSingerId], function(error, voteresult) {
				
			//		console.log(voteresult[0].singer_name);

					var singerb_name = voteresult[0].singer_name;
					var chartQry1 = 'SELECT singer.song_name, singer.album_name FROM singer WHERE singer.singer_id=?';

					connection.query(chartQry1, [ParamsSingerId], function(error, chartresult1) {
				
							
							var chartQry2 = "SELECT chart_sample.idx, chart_sample.is_up FROM chart_sample WHERE chart_sample.singer_name=?";							
							connection.query(chartQry2, [singerb_name], function(error, chartresult2) {
								

								var prevoteQry = "select program_name, program_data from duckmate.program_pre where singer1=? or singer2=? or singer3=? or singer4=? or singer5=?";
								var curevoteQry = "select program_name, program_data from duckmate.program_cure where singer1=? or singer2=? or singer3=? or singer4=? or singer5=?";

								connection.query(prevoteQry,[singerb_name, singerb_name, singerb_name, singerb_name, singerb_name],function(error, prevoteresult) {
									
									connection.query(curevoteQry,[singerb_name, singerb_name, singerb_name, singerb_name, singerb_name],function(error, curevoteresult) {
									

										console.log(prevoteresult);
										console.log(curevoteresult);
										var chartData = {
											song_name : chartresult1[0].song_name,
											album_name : chartresult1[0].album_name,
											melonchart : chartresult2
										}
										

										var sendData = {
											member_name : result[0].member_name,
											member_img : result[0].member_img,
											member_level : result[0].member_level,
											singer: []
										}

										var proData = {
											pre_data : prevoteresult,
											cure_data : curevoteresult[0]
										
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
												res.status(200).send({result : true, message : true, vote_data : voteresult[0], program_data : proData, chart_data : chartData, nevi_data : sendData});
											}
										}

										return
									});//curevoteQry connection
								});//prevoteQry connection
							});//chartQry2 connection
					}); //chartQry1 connection
				}); //votedataQry connection

            }); //SingerValueQry connection

        }); //InsertValueQry connection
    }); // pool

}); //post

module.exports = router;
