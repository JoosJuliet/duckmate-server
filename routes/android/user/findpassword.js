var express = require('express');
var router = express.Router();
var app = express();
var fs = require('fs');

router.route('/')
.post((req, res)=>{
	pool.query( 'select * from duckmate.member where member_email =?;', [req.body.member_email] , function( err, rows ) {
		if (err){
			console.log("여기서 에러"+this.sql);
			res.status(200).json({
				result: false,
				qry: this.sql,
				msg: "db 접속 에러",
			});
			return;
		}
		rows = JSON.parse( JSON.stringify(rows));
		rows = rows[0];
		if( rows.length === 0 || rows.length === 1 ){
			res.status(200).json({
				result: false,
				msg: "해당 member_email이 등록되있지 않습니다.",
			});
			return;
		}
		else updateHelpFlag(rows);
	});

	const updateHelpFlag = (r) =>{
		pool.query( 'update duckmate.member set helpflag = 1 where member_email =?', [req.body.member_email] , function( err, results ) {
			if (err){
				console.log("여기서 에러"+this.sql);
				res.status(500).json({
					result: false,
					qry: this.sql,
					msg: "db 접속 에러",
				});
				return;
			}

			if(results.affectedRows == 1){
				res.status(200).json({
					result: true,
					msg: "정상적으로 help가 쳐졌습니다.",
				});
			}else{
				res.status(200).json({
					result: true,
					msg: "정상적으로 help가 쳐졌습니다.",
				});
			}

		});

		return 1;
	};

});

module.exports = router;
