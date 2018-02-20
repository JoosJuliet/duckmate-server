var express = require('express');
var router = express.Router();
var app = express();

let voteTypeCPS;
let programName;
let singerName;
router.route('/')
.post((req, res)=>{
  // 프로그램 이름과  실시간인지 사전투표인지 알려주면 투표가 반영되는 것

  /*
    voteTypeCPS로 table위치 찾고
    singerName , programName으로 column찾는다.
    존재하면 count올리는 것

    {'ingi':'0','mcount':'1','music_bank':'2'}
  */
  let memeberId;
  let singerNum = req.body.singerNum;
  let tmp_singerId = 'singer'+singerNum+'_id';
  let singerVoteCount = singerNum+'_vote_count';

  voteTypeCPS = req.body.voteTypeCPS;
  programName = req.body.programName;
  singerName = req.body.singerName;




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


    checkSingerVoteCPS();
  });

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
    pool.query('update duckmate.singer set choice_count = choice_count +1 where singer_id = ?', [singerId], function(error, results){
  		if (error){
  			console.log("Connection Error" + error);
  			res.sendStatus(500);
  		}
      res.status(201).send({result : 'success'});
			// res.status(201).send({result : 'success'});
  	});
  };

  const checkSingerVoteCPS = ()=>{
// 싱어가 하는 지 프로그램 하는지 안하는지 확인
    if( voteTypeCPS === "0" ){
      //cure이다
      pool.query('SELECT * FROM program_cure WHERE \''+ singerName +'\' IN (singer1,singer2,singer3,singer4,singer5,singer6,singer7,singer8,singer9,singer10)', function(error, rows){
        if (error){
    			console.log("Connection Error" + error);
    			res.sendStatus(500);
    		}
        if ( rows !== undefined){
          updateMemberSingerVotes();
        }else{
          res.status(301).send({result : 'false',
                                message : '해당 가수가 없다'});
        }
      });
    }else if (voteTypeCPS === "1"){
      pool.query('SELECT * FROM program_pre WHERE \''+ singerName +'\' IN (singer1,singer2,singer3,singer4,singer5,singer6,singer7,singer8,singer9,singer10)', function(error, rows){
        if (error){
    			console.log("Connection Error" + error);
    			res.sendStatus(500);
    		}
        if ( rows !== undefined){
          updateMemberSingerVotes();
        }else{
          res.status(301).send({result : 'false',
                                message : '해당 가수가 없다'});
        }
      });

    }
    // else if (voteTypeCPS === "2"){
    //   pool.query('SELECT * FROM program_cure WHERE \''+ singerName +'\' IN (singer1,singer2,singer3,singer4,singer5,singer6,singer7,singer8,singer9,singer10)', function(error, rows){
    //     if (error){
    // 			console.log("Connection Error" + error);
    // 			res.sendStatus(500);
    // 		}
    //     if ( rows !== undefined){
    //       updateMemberSingerVotes();
    //     }else{
    //       res.status(301).send({result : 'false',
    //                             message : '해당 가수가 없다'});
    //     }
    //   });
    // }

  };


});



module.exports = router;
