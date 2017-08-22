var express = require('express');
var router = express.Router();
var app = express();
var fs = require('fs');


router.route('/')
.get((req, res)=>{
    pool.query( 'select * from notice order by notice_id' , function( err, rows ) {
        if (err){
    		console.log(err);
    		res.status(500).json({
                result: false,
                msg: "db 접속 에러",
                qry: this.sql
            });
            return;
        }
        rows =JSON.parse(JSON.stringify(rows));
        console.log(rows[0]);

        if( rows.length === 0 ){
            res.status(200).json({
                result: false,
                msg: "공지가 없습니다.",
            });
        }else{
            res.status(200).json({
                result: false,
       			msg: "공지입니다",
				data: rows[0]
            });

        }
    });

});


module.exports = router;
