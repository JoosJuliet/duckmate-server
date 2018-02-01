var express = require('express');
var router = express.Router();
var app = express();

router.route('/')
.post((req, res)=>{
  let memeberId;
  let singerNum = req.body.singerNum;
  let tmp_singerId = 'singer'+singerNum+'_id';
  let singerVoteCount = singerNum+'_vote_count';
  let singerId;
  pool.query( 'select member_id,'+tmp_singerId+' from duckmate.member where firebaseToken = ?;', [ req.body.firebaseToken ] , function( err, rows ) {
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
    

	memeberId = rows[0].member_id;

    const properties = ['singer0_id','singer1_id','singer2_id','singer3_id'];
    for(var i=0; i< properties.length;i++){
      if( rows[0].hasOwnProperty(properties[i])){
        let tmp = properties[i];
	 singerId = rows[0][""+tmp+""];

      }
    }


	console.log("singerID값");
    updateMemberSingerVotes();


  });

  // const updateVoteTable = () =>{
  // };

  const updateMemberSingerVotes = () =>{
    console.log("updateMemberSingerVotes왔당");
    pool.query('update duckmate.member set '+singerVoteCount+' = '+singerVoteCount+' +1 where firebaseToken = ?', [req.body.firebaseToken], function(error, results){
  		if (error){
  			console.log("Connection Error" + error);
  			res.sendStatus(500);
  		}

      updateSingerVotes();
  	});

  };

  const updateSingerVotes = ()=>{
    console.log("updateSingerVotes왔당");

    pool.query('update duckmate.singer set choice_count = choice_count +1 where singer_id = ?', [singerId], function(error, results){
  		if (error){
  			console.log("Connection Error" + error);
  			res.sendStatus(500);
  		}
      console.log("singerId는 "+singerId);
      console.log(results);
  			res.status(201).send({result : 'success'});
  	});

  };


});


module.exports = router;
