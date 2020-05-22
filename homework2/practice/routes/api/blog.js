var express = require('express');
var router = express.Router();

router.get('/post', function(req,res,next){
    res.send("blog~");
});

module.exports = router;