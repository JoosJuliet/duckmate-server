var express = require('express');
var router = express.Router();
var app = express();

router.route('/')
.get((req, res)=>{
    pool.query('select * from program', function(error, rows){
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
            res.status(200).json({
                result: true,
                msg: "프로그램들 입니다.",
                data : results
            });
        }else{
            res.status(200).json({
                result: false,
                msg: "프로그램이 없네요.",
            });
        }

    });
});




module.exports = router;
