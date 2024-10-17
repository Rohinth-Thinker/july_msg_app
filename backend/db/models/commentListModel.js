
const mongoose = require('mongoose');

const commmentListSchema = mongoose.Schema({
    username : String,
    
    parentId : {
        type : mongoose.Schema.Types.ObjectId,
        default : null,
    },
    
    text : String,

    replies : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "commentList",
            default : [],
        }
    ],

}, { timestamps : true })

module.exports = mongoose.model("commentList", commmentListSchema, "commentList");