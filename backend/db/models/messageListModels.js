
const mongoose = require('mongoose');

const messageListSchema = mongoose.Schema({
    username : String,
    message : String,
}, { timestamps : true })

module.exports = mongoose.model('messageList', messageListSchema, 'messageList');