
var express = require('express');
var router = express.Router();

var app = express();

console.log("hi");




/* GET home page. */
/*router.post('/',(req,res,next)=>{
console.log( 1 );
res.send('post');
});*/
router.get('/', function(req, res, next) {
console.log("time"+
Date.now());
         res.send('depromeet');
});

console.log("right");


module.exports = router;
