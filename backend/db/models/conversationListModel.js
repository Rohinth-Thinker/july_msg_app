
const mongoose = require('mongoose');

const conversationListSchema = mongoose.Schema({
    conversation : {
        type : [ String ],
        required : true,
    },

    messages : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'messageList',
            default : [],
        }
    ],
}, { timestamps : true })


module.exports = mongoose.model('conversationList', conversationListSchema, 'conversationList');