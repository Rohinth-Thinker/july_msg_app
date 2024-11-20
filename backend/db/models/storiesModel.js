const mongoose = require('mongoose');

const storiesSchema = mongoose.Schema({
    username : { type : String, required : true },

    storySrc : String,

    storySeenMembers : {
        type : [ String ],
        default : [],
    }

}, { timestamps : true })

module.exports = mongoose.model('stories', storiesSchema, 'stories');