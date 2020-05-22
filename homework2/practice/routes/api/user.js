var express = require('express');
var router = express.Router();

router.get('/login', function(req,res,next){
    res.send("login~");
});

router.get('/signup', function(req,res,next){
    res.send("sign up~~");
});

module.exports = router;