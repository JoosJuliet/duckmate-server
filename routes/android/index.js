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

router.use('/singer', singer);
router.use('/login', login);
router.use('/register', register);
router.use('/findpassword',FindPassWord);
router.use('/memberDelete',memberDelete);

router.use((req, res, next)=>{
    pool.query( 'select 1' , (err)=>{
        // TODO 뒷 api들은 여기를 거치고 가니 여기서 routing을 하면 될듯
        if (err){


                        // 알수 없는 에러 로그만 남기자
            console.log(err.stack,err);
            return;
        }else{
            next();
        }
    });



});
router.use('/question', question);
router.use('/notice', notice);

router.use('/alarm',alarm);
router.use('/program',program);
router.use('/firstpage',firstpage);

module.exports = router;
