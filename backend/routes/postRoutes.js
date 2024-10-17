const { Router } = require('express');
const { storePost, getPost, getReadablePost, fetchPosts, handleLikes, addPostComments, getPostAllComments, getRepliesComment } = require('../controllers/postControllers');
const validateToken = require('../middleware/validateToken');

const router = Router();

router.post('/store', validateToken, storePost);
router.get('/:postId', validateToken, getPost);
router.get('/files/:fileId', validateToken, getReadablePost);
router.get('/posts/fetch', validateToken, fetchPosts);

router.post('/comments/add', validateToken, addPostComments);
router.get('/:postId/comments/all', validateToken, getPostAllComments);
router.get('/get/comments/replies/:commentId', validateToken, getRepliesComment);

router.patch('/handle/interactions/like', validateToken, handleLikes);

module.exports = router;