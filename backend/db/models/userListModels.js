const mongoose = require('mongoose');

const userListSchema = mongoose.Schema({
    username : { type : String, required : true, unique : true, },
    password : { type : String, required : true },
}, { timestamps : true });

module.exports = mongoose.model('userList', userListSchema);