var express = require('express');
var router = express.Router();
var app = express();

router.route('/')
.post((req, res)=>{
  let memeberId;
  let singerNum = req.body.singerNum;
  let tmp_singerId = 'singer'+singerNum+'_id';
  let singerVoteCount = singerNum+'_vote_count';
  pool.query( 'select member_id,? from duckmate.member where firebaseToken = ?;', [ tmp_singerId, req.body.firebaseToken ] , function( err, rows ) {
    if (err){
      console.log(err);
      res.status(500).json({
        // TODO 이런 거 예전에 ios에서 했떤 것 처럼 함수를 만들어 놓고 그걸 불러오기로 해서 해도 되겠느데
        result: false,
        msg: "db 접속 에러",
        qry: this.sql
      });
      return;
    }
    console.log(rows[0].member_id);
    memeberId = rows[0].member_id;
    // updateVoteTable();
    updateMemberSingerVotes();


  });

  // const updateVoteTable = () =>{
  // };

  const updateMemberSingerVotes = () =>{
    console.log("updateMemberSingerVotes왔당");
    pool.query('update duckmate.member set ? = ? +1 where firebaseToken = ?', [singerVoteCount,singerVoteCount,req.body.firebaseToken], function(error, results){
  		if (error){
  			console.log("Connection Error" + error);
  			res.sendStatus(500);
  		}

      updateSingerVotes();
  	});

  };

  const updateSingerVotes = ()=>{
    console.log("updateSingerVotes왔당");

    pool.query('update duckmate.singer set choice_count = choice_count+1 where firebaseToken = ?', [req.params.firebaseToken], function(error, results){
  		if (error){
  			console.log("Connection Error" + error);
  			res.sendStatus(500);
  		}
  		else {
  			res.status(201).send({result : 'success'});
  		}
  	});

  };


});


module.exports = router;
