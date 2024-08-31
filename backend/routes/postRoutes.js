const { Router } = require('express');
const { storePost, getPost, getReadablePost, fetchPosts } = require('../controllers/postControllers');
const validateToken = require('../middleware/validateToken');

const router = Router();

router.post('/store', validateToken, storePost);
router.get('/:postId', validateToken, getPost);
router.get('/files/:fileId', validateToken, getReadablePost);
router.get('/posts/fetch', validateToken, fetchPosts);

module.exports = router;