const { getConversation, createConversation, getConversationsById, addMessage, getAllConversationByUsername } = require("../db/dbFunctions");
const { io, getOnlineUsers } = require("../socket/socket");

async function createNewConversation(req, res) {
    try {
        const { username } = req;
        const { receivers } = req.body;

        if (!receivers || receivers.length <= 0) {
            return res.status(400).json({ error : 'Invalid Receivers' });
        }

        let conversation = await getConversation(username, receivers);
        if (conversation) {
            return res.status(200).json({ id : conversation._id });
        }
        conversation = await createConversation(username, receivers);
        
        res.json({ id : conversation._id });

    } catch(err) {
        console.log(`At CreateConversation Controller, ${err.name} : ${err.message}`);
        res.status(500).json({ error : 'An error occurred, Try again later' });
    }
}

async function getConversations(req, res) {
    try {
        const { id } = req.params;
        const conversation = await getConversationsById(id);
        if (conversation.status === false) {
            return res.status(conversation.statusCode).json({ error : conversation.msg });
        }

        res.status(200).json({status : true, conversation});

    } catch(err) {
        console.log(`At GetConversation Controller, ${err.name} : ${err.message}`);
        res.status(500).json({ error : 'An error occurred, Try again later' });
    }
}

async function getAllConversation(req, res) {
    try {
        const { username } = req;
        const userConversations = await getAllConversationByUsername(username);
        res.json(userConversations);
    } catch(err) {
        console.log(`At GetAllConversation Controller, ${err.name} : ${err.message}`);
        res.status(500).json({ error : 'An error occurred, Try again later' });
    }
}

async function sendMessage(req, res) {
    try{
        const { username } = req;

        const { conversationId, message } = req.body;
        if(!conversationId, !message) {
            return res.status(400).json({ error :'Invalid parameters' });
        }

        const response = await addMessage(username, conversationId, message);
        if (!response.status) {
            return res.status(response.statusCode).json({ error : response.msg });
        }

        const receivers = response.members.filter((memberName) => memberName !== username);
        const sockets = receivers.map((receiverName) => {
            if (getOnlineUsers[receiverName]) return getOnlineUsers[receiverName];
        })

        console.log(sockets);
        io.to(sockets).emit("newMessage", response.newMessage);

        res.json(response.newMessage._id);

    } catch(err) {
        console.log(`At SendMessage Controller, ${err.name} : ${err.message}`);
        res.status(500).json({ error : 'An error occurred, Try again later' });
    }
}

module.exports = { createNewConversation, getConversations, sendMessage, getAllConversation};