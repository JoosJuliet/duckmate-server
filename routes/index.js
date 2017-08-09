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


router.use('/question', question);
router.use('/notice', notice);

router.use('/alarm',alarm);
router.use('/program',program);
router.use('/firstpage',firstpage);

module.exports = router;
