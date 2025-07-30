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
        type : [ String ],
        default : [],
    },

    postComments : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "commentList",
            default : []
        }
    ],

    fileType: String,

}, { timestamps : true })


module.exports = mongoose.model('posts', postsSchema, 'posts');