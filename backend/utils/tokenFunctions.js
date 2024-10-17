const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

function generateToken(username) {
    const token = jwt.sign({username}, process.env.SECRET_KEY, {expiresIn : '15d'});
    return token;
}

function verifyToken(token) {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    return decoded;
}


module.exports = { generateToken, verifyToken };