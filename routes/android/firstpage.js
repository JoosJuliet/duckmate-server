var express = require('express');
var mysql = require('mysql');

var fs = require('fs');
var router = express.Router();


router.get('/scoreup/:firebaseToken', function(req, res, next) {
	pool.query('update member set member_score = member_score+1 where firebaseToken = ?', [req.params.firebaseToken], function(error, rows){
		if (error){
			console.log("Connection Error" + error);
			res.sendStatus(500);
		}
		else {
			res.status(201).send({result : 'success'});
		}
	});
});




router.get('/:firebaseToken/:singer_id', function(req, res, next) {

	var ParamsSingerId = req.params.singer_id;
	var ParamsFirebase = req.params.firebaseToken;

	var InsertValueQry = 'SELECT member_name, member_img, member_level FROM duckmate.member where firebaseToken = ?';
	var SingerValueQry = 'SELECT singer0_id,singer1_id, singer2_id,singer3_id FROM duckmate.member where firebaseToken = ?';
	var votedataQry = 'SELECT singer.singer_name, singer.singer_img, singer.choice_count, A.0_vote_count from (select member.0_vote_count from duckmate.member where firebaseToken=?) as A, duckmate.singer  where singer.singer_id=?';
	var chartQry1 = 'SELECT singer.song_name, singer.album_name, singer.album_img FROM singer WHERE singer.singer_id=?';
	var prevoteQry = "select program_name, program_data from duckmate.program_pre where singer1=? or singer2=? or singer3=? or singer4=? or singer5=?";
	var curevoteQry = "select program_name, program_data from duckmate.program_cure where singer1=? or singer2=? or singer3=? or singer4=? or singer5=?";
	var chartQry2 = "SELECT chart_sample.idx, chart_sample.is_up FROM chart_sample WHERE chart_sample.singer_name=?";


	pool.query(InsertValueQry, [ParamsFirebase], function(error, result) {
		console.log(result);

		if( result.length === 0  ){
			res.status(200).json({ result: false, msg: "InsertValueQry error"});
		}

		pool.query(SingerValueQry, [ParamsFirebase], function(error, result0) {
			console.log(result0);

			if( result0.length === 0  ){
				res.status(200).json({ result: false, msg: "SingerValueQry error"});
			}

			var NotUndefinedSigner = [];

			var singerArr = ["singer0_id", "singer1_id", "singer2_id", "singer3_id"];
			for (var x = 0; x < singerArr.length; x++) {
				var Singerb_id = result0[0][singerArr[x]];
				if (Singerb_id) {
					NotUndefinedSigner.push(Singerb_id);
				}
			}

			//	var singerb_id = result0[0][singerArr[0]];

			pool.query(votedataQry, [ParamsFirebase, ParamsSingerId], function(error, voteresult) {

			//		console.log(voteresult[0].singer_name);

				if( voteresult.length === 0  ){
					res.status(200).json({ result: false, msg: "votedataQry error"});
				}

				var singerb_name = voteresult[0].singer_name;

				pool.query(chartQry1, [ParamsSingerId], function(error, chartresult1) {

					if( chartresult1.length === 0  ){
						res.status(200).json({ result: false, msg: "chartQry1 error"});
					}

					pool.query(chartQry2, [singerb_name], function(error, chartresult2) {

						pool.query(prevoteQry,[singerb_name, singerb_name, singerb_name, singerb_name, singerb_name],function(error, prevoteresult) {

							pool.query(curevoteQry,[singerb_name, singerb_name, singerb_name, singerb_name, singerb_name],function(error, curevoteresult) {

								console.log(prevoteresult);
								console.log(curevoteresult);
								var chartData = {
									song_name : chartresult1[0].song_name,
									album_name : chartresult1[0].album_name,
									album_img : chartresult1[0].album_img,
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
								var SingerNameFlagQry = 'SELECT singer_name,new_flag FROM duckmate.singer where singer_id = ?';

								var SingerDb = (element, y) => {
									pool.query(SingerNameFlagQry, [NotUndefinedSigner[y]], function(error, result1) {

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
							return
						});//prevoteQry connection
						return
					});//chartQry2 connection
					return
				}); //chartQry1 connection
				return
			}); //votedataQry connection
			return
		}); //SingerValueQry connection
		return
	}); //InsertValueQry connection
}); //get

module.exports = router;
