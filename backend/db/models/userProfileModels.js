const mongoose = require('mongoose');

const userProfileSchema = mongoose.Schema({
    username : { type : String, required : true, unique : true, },

    userProfilePic : {
        type : mongoose.Schema.ObjectId,
        ref : 'profilePic',
        default : null,
    },

    userBio : {
        type : String,
        default : '',
    },

    userPost : {
        type : [ mongoose.Schema.ObjectId ],
        default : []
    },

    userFollowers : {
        type : [ String ],
        default : [],
    },

    userFollowing : {
        type : [ String ],
        default : [],
    },
}, { timestamps : true })

module.exports = mongoose.model('userProfile', userProfileSchema, 'userProfile');