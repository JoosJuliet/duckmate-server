const express = require('express');
const router 	= express.Router();


const memberDelete 	= require('./user/memberDelete');
const singer				= require('./singer');
const login 				= require('./user/login');
const register 			= require('./user/register');
const FindPassWord 	= require('./user/findpassword');
const question 			= require('./question');
const notice 				= require('./notice');
const alarm 				= require('./alarm');
const program 			= require('./program');
const firstpage 		= require('./firstpage');
const adminpage 		= require('./adminpage');
const vote 					= require('./vote');
router.use((req, res, next) => {
	console.log("req.headers['user-agent']"+req.headers['user-agent']);
	next();
});

/* user folder */
router.use('/login', login);
router.use('/register', register);
router.use('/findpassword',FindPassWord);
router.use('/firstpage',firstpage);
router.use('/notice', notice);
router.use('/program',program);
router.use('/singer', singer);
router.use('/alarm',alarm);
router.use('/adminpage', adminpage);

router.use((req, res, next)=>{
  let firebaseToken;
  let rqstMethodCheck = (req.method == 'GET') ? req.query : req.body;
  if( !rqstMethodCheck.firebaseToken ){
    res.json({
        result: false,
        msg: "[ firebaseToken ]이 필요함"
    });
    return;
  } else {
    firebaseToken = rqstMethodCheck.firebaseToken ;
  }

	pool.query( 'select 1 from duckmate.member where firebaseToken = ?;' ,[ firebaseToken ] , (err,rows)=>{
        // TODO 은행업무중에서 헤리슨님한테 -10 나 +10해야하는데
        // 헤리슨님 -10하고 죽음 안되니까 transaction을 써야한다
    if (err){
        res.status(500).json({
            result: false,
            msg: "db 접속 에러",
            qry: this.sql
        });
        return;
    }
		console.log(rows);
    if( rows.length === 0 ){
      res.status(200).json({
          result: false,
          msg: "등록된 토큰이 없네요.",
      });
    } else {
			next();
		}
    });
});
router.use('/memberDelete',memberDelete);
router.use('/question', question);
//router.use('/alarm',alarm);

router.use('/vote',vote);


module.exports = router;
