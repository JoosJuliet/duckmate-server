const express = require('express');
const router = express.Router();


const memberDelete = require('./memberDelete');

const singer = require('./singer');

const login = require('./1/login');
const register = require('./1/register');
const FindPassWord = require('./1/findpassword');

const question = require('./question');
const notice = require('./notice');

const alarm = require('./alarm');
const program = require('./program');
const firstpage = require('./firstpage');


router.use('/login', login);
router.use('/register', register);
router.use('/findpassword',FindPassWord);
router.use('/memberDelete',memberDelete);

router.use('/firstpage',firstpage);

router.use('/notice', notice);

router.use('/program',program);

router.use('/singer', singer);


router.use((req, res, next)=>{
    let firebaseToken ;
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

        if( rows.length ) next();
        else
        {
            res.status(200).json({
                result: false,
                msg: "프로그램이 없네요.",
            });
        }

    });
});
router.use('/question', question);
router.use('/alarm',alarm);


module.exports = router;
