var express = require('express');
var router = express.Router();

router.get('/login', function(req,res,next){
    res.send("this is login page");
});

router.get('/signup', function(req,res,next){
    res.send("this is signup page");
});

module.exports = router;