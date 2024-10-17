
const { Router } = require('express');
const { createNewConversation, getConversations, sendMessage, getAllConversation } = require('../controllers/conversationControllers');
const validateToken = require('../middleware/validateToken');

const router = Router();

router.post('/new', validateToken, createNewConversation);
router.get('/get/:id', validateToken, getConversations);
router.get('/get/all/conversations', validateToken, getAllConversation);
router.post('/messages/send', validateToken, sendMessage);

module.exports = router;