var express = require('express');
var mysql = require('mysql');

var fs = require('fs');
var router = express.Router();

router.get('/',function(req, res, next){
	res.render('adminpage', {title : 'adminpage'});
});


router.post('/singerpage',function(req, res, next) {

      var sql, inserts;
	console.log(req.body.album);
	console.log(req.body.title);
	console.log(req.body.idx);
       	if(req.body.album && req.body.title){
                sql = 'update singer set song_name = ?, album_name = ? where singer_id = ?';
                inserts = [req.body.title, req.body.album, req.body.idx];

        }else if(req.body.album){
                sql = 'update singer set album_name = ? where singer_id = ?';
                inserts = [req.body.album, req.body.idx];
        }else{
                sql = 'update singer set song_name = ? where singer_id = ?';
                inserts = [req.body.title, req.body.idx];
        }
	console.log(sql);
	console.log(inserts);
        pool.query(sql, inserts, function(error, rows){
       	 if (error){
       	   console.log("Connection Error" + error);
       	   res.sendStatus(500);
       	 }
      	  else {
       	     res.status(201).send({result : 'success'});
       	 }
        });//pool
});//post





module.exports = router;
