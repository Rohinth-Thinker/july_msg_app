const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

function generateToken(userId) {
    const token = jwt.sign({userId}, process.env.SECRET_KEY, {expiresIn : '15d'});
    return token;
}


module.exports = { generateToken };