var express = require('express');
var router = express.Router();
const postController = require('../controller/postController');

router.get('/readall', postController.readAllPost);
router.get('/:postIdx', postController.readOnePost);
router.post('/create', postController.createPost);
router.put('/update', postController.updatePost);
router.delete('/delete/:postIdx', postController.deletePost);
module.exports = router;