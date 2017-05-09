
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:id', function(req,res){
res.send(req.params.id);

});




router.post('/:id', function(req, res) {

	res.send(req.params.id);


});

module.exports = router;
