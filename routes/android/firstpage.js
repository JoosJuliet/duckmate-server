var express = require('express');
var mysql = require('mysql');

var fs = require('fs');
var router = express.Router();


router.get('/scoreup/:firebaseToken', function(req, res, next) {
	pool.getConnection(function(error, connection){
	    if (error){
	        console.log("getConnection Error" + error);
		    res.sendStatus(500);
		}
		else{
		    connection.query('update member set member_score = member_score+1 where firebaseToken = ?', [req.params.firebaseToken], function(error, rows){
				if (error){
	        		   console.log("Connection Error" + error);
					   res.sendStatus(500);
					   connection.release();
				}
				else {
				       res.status(201).send({result : 'success'});
				       connection.release();
				}
			});
		 }
	});
});


/*
router.get('/:firebaseToken/:singer_id', function(req, res, next) {
	var ParamsSingerId = req.params.singer_id;
	var ParamsFirebase = req.params.firebaseToken;


	pool.query('select member_level, member_name, member_img ,singer0_id,singer1_id,singer2_id,singer3_id from duckmate.member ', [req.params.firebaseToken] , function( err, rows ) {
        if (err){
            console.log(err);
            res.status(500).json({
                result: false,
                msg: "db 접속 에러",
                qry: this.sql
            });
            return;
        }
        if( rows.length === 0  ){
            res.status(200).json({
                result: false,
                msg: "singer들이 없네요",
            });
        }else{
            res.status(200).json({
                result: true,
                msg: "맴버의 정보입니다.",
                data : rows
            });
        }
    });


	pool.getConnection(function(error, connection) {

		if (error){
        	console.log("getConnection Error" + error);
	    	res.sendStatus(500);
			connection.release();
		}


        var InsertValueQry = 'SELECT member_name, member_img, member_level FROM duckmate.member where firebaseToken = ?';
        connection.query(InsertValueQry, [ParamsFirebase], function(error, result) {
		 console.log(result);

			if( result.length === 0  ){
				res.status(200).json({ result: false, msg: "InsertValueQry error"});
				connection.release();
			}

            var SingerValueQry = 'SELECT singer0_id,singer1_id, singer2_id,singer3_id FROM duckmate.member where firebaseToken = ?';
            connection.query(SingerValueQry, [ParamsFirebase], function(error, result0) {
				console.log(result0);

				if( result0.length === 0  ){
					res.status(200).json({ result: false, msg: "SingerValueQry error"});
					connection.release();
				}

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

					if( voteresult.length === 0  ){
						res.status(200).json({ result: false, msg: "votedataQry error"});
						connection.release();
					}

					var singerb_name = voteresult[0].singer_name;
					var chartQry1 = 'SELECT singer.song_name, singer.album_name FROM singer WHERE singer.singer_id=?';

					connection.query(chartQry1, [ParamsSingerId], function(error, chartresult1) {

							if( chartresult1.length === 0  ){
								res.status(200).json({ result: false, msg: "chartQry1 error"});
								connection.release();
							}

							var chartQry2 = "SELECT chart_sample.idx, chart_sample.is_up FROM chart_sample WHERE chart_sample.singer_name=?";
							connection.query(chartQry2, [singerb_name], function(error, chartresult2) {

								if( chartresult2.length === 0  ){
									res.status(200).json({ result: false, msg: "chartQry2 error"});
									connection.release();
								}

								var prevoteQry = "select program_name, program_data from duckmate.program_pre where singer1=? or singer2=? or singer3=? or singer4=? or singer5=?";
								var curevoteQry = "select program_name, program_data from duckmate.program_cure where singer1=? or singer2=? or singer3=? or singer4=? or singer5=?";

								connection.query(prevoteQry,[singerb_name, singerb_name, singerb_name, singerb_name, singerb_name],function(error, prevoteresult) {

									if( prevoteresult.length === 0  ){
										res.status(200).json({ result: false, msg: "prevoteQry error"});
										connection.release();
									}

									connection.query(curevoteQry,[singerb_name, singerb_name, singerb_name, singerb_name, singerb_name],function(error, curevoteresult) {


										if( curevoteresult.length === 0  ){
											res.status(200).json({ result: false, msg: "curevoteQry error"});
											connection.release();
										}

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
										var SingerNameFlagQry = 'SELECT singer_name,new_flag FROM duckmate.singer where singer_id = ?';

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
												connection.release();
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
*/
module.exports = router;
