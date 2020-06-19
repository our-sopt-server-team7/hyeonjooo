var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.use('/user', require('./user'));
//router.post('/image', AuthMiddleware.checkToken, upload.array('images', 4), ImageController.array);

module.exports = router;
