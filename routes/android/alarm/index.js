
var express = require('express');
var fs = require('fs');
var router = express.Router();

router.route('/input')
.post((req, res)=>{
  pool.query( 'select member_name,singer0_id,singer1_id,singer2_id,singer3_id from duckmate.member where singer0_id = \'56\';' , function( err, rows ) {
    if (err){
    	console.log(err);
    	res.json({
        result: false,
        msg: "db 접속 에러",
        qry: this.sql
      });
      return;
    }
    res.status(200).json(typeof rows[0]['singer1_id']);


	console.log(rows[0]);
	let arr = [];
	for( let i = 0; i < rows.length; i++){
		if( rows[i]['singer0_id'] === 56 )
			arr.push (rows[i]);
	}
	console.log(arr[0]["member_name"]);

  });

})
.get((req,res)=>{
  if(!req.query.singer_id){
    res.json({
      result: false,
      msg: "req.query.singer_id가 없습니다."
    });
    return;
  }

  pool.query('select alarm_array from duckmate.singer where singer_id = ?;' , [ req.query.singer_id ] ,function( err, rows ) {
    if (err){
    	console.log(err);
    	res.json({
        result: false,
        msg: "db 접속 에러",
        qry: this.sql
      });
      return;
    }

    res.status(200).json(rows[0]);
  });

})
.put((req,res)=>{
  if(!req.body.singer_id){
    res.json({
      result: false,
      msg: "req.body.singer_id가 없습니다."
    });
    return;
  }

  pool.query( 'update duckmate.singer set alarm_array = ? where singer_id = ?;',[ req.body.alarm_array ,req.body.singer_id ] , function( err, results ) {
    if (err){
      console.log(err);
      res.json({
        result: false,
        msg: "db 접속 에러",
        qry: this.sql
      });
      return;
    }
    res.status(200).json({result: true});
  });

});

//일단 /input get으로 가져온다. 그다음 post /alarm으로 선택한 것을 나에게 적용시킨다.
//  /input post로 어떤 singer가 어디에 출연하는지 가져온다.


router.route('/')
.post((req, res)=>{

  const properties = ['firebaseToken','fcm_token','today_alarm','zero_flag','one_flag','two_flag','three_flag'];
  for(var i=0; i< properties.length;i++){
    if(!req.body.hasOwnProperty(properties[i])){
      res.json({
        result: false,
        msg: "req.body."+properties[i]+"이 없습니다."
      });
      return;
    }
  }
  // const properties = ['title','summary','started_at','ended_at','choice_type','content'];
  // const invalidProperty = properties.find((property) => !req.body.hasOwnProperty(property));
  // if( invalidProperty ){
  //   return res.status(400).json({
  //     msg: "req.body."+properties+"이 없습니다."
  //   });
  // }


	console.log(req.body.zero_flag);
	let zero_flag_1 = "["+req.body.zero_flag+"]";
	let one_flag_1 = "["+req.body.one_flag+"]";
	let two_flag_1 = "["+req.body.two_flag+"]";
	let three_flag_1 = "["+req.body.three_flag+"]";

  pool.query( 'update duckmate.member set fcm_token = ?, today_alarm = ?, 0_flag = ?, 1_flag = ?, 2_flag = ?, 3_flag = ?  where firebaseToken = ?;', [ req.body.fcm_token, req.body.today_alarm, zero_flag_1 , one_flag_1, two_flag_1 , three_flag_1 , req.body.firebaseToken] , function( err, results ) {
    if (err){
    	console.log(err);
    	res.json({
        result: false,
        msg: "db 접속 에러",
        qry: this.sql
      });
      return;
    }
  console.log(results,this.sql);
    if( results.affectedRows ){
      res.status(201).json({
        result: true,
        msg: "업데이트가 완료되었습니다.",
      });
    }else{
      res.status(201).json({
        result: false,
        msg: "업데이트가 실패되었습니다.",
      });
    }
  });
})
.get((req,res)=>{
  if( !req.query.firebaseToken ){
    res.json({
      result: false,
      msg: "req.body.firebaseToken가 없습니다."
    });
    return;
  }
  pool.query( 'select 0_flag,1_flag,2_flag,3_flag,today_alarm FROM duckmate.member where firebaseToken =?   ;', [ req.query.firebaseToken ] , function( err, rows ) {
    if (err){
      console.log("여기서 에러"+this.sql);
      res.status(200).json({
        result: false,
        qry: this.sql,
        msg: "db 접속 에러",
      });
    }

    rows = JSON.parse( JSON.stringify(rows[0]));


    console.log(rows);


    let d0 = JSON.parse( rows["0_flag"]),
        d1 = JSON.parse( rows["1_flag"]),
        d2 = JSON.parse( rows["2_flag"]),
        d3 = JSON.parse( rows["3_flag"]);

  	let arr = [];
  	for(let i =0 ; i < 4 ; i++)
  		arr.push ( JSON.parse( rows[""+i+"_flag"] ) );

  	console.log("arr", arr );

  	let arrr = [];
  	for( let i =0 ; i < 4; i++){
  		let d = {};
  		d[""+i+""] = [];
  		d[""+i+""].push ( i );
  		d[""+i+""].push( arr[i] );
  		arrr.push(d);
  	}
    console.log("arrr",arrr);
    if( rows.length === 0 ){
        res.status(200).json({
            result: false,
            msg: "해당 firebaseToken이 등록되있지 않습니다.",
        });
    }else{
      let dataObject = {
        "zero_flag" : d0,
        "one_flag" : d1,
        "two_flag" : d2,
        "three_flag" : d3,
        "today_alarm" : rows.today_alarm
      };
	    console.log(dataObject);
      res.status(200).json({
        result: true,
        msg: "가져오기 성공",
        data : dataObject,
      });
    }
  });
});



module.exports = router;
