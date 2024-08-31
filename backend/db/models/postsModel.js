const mongoose = require('mongoose');

const postsSchema = mongoose.Schema({
    username : { type : String, required : true },

    postFileId : {
        type : mongoose.Schema.ObjectId,
        ref : 'uploadPost.files',
        required : true,
    },

    postCaption : String,

    postLikes : {
        type : [ mongoose.Schema.ObjectId ],
        default : [],
    },

    postComments : {
        type : [ mongoose.Schema.ObjectId ],
        default : [],
    },

}, { timestamps : true })


module.exports = mongoose.model('posts', postsSchema, 'posts');