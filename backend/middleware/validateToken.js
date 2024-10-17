const { findUser } = require("../db/dbFunctions");
const { verifyToken } = require("../utils/tokenFunctions");

async function validateToken(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({msg : 'token is not provied'});
    }

    const decoded = verifyToken(token);
    if (!decoded) {
        return res.status(401).json({msg : 'Invalid Token'});
    }

    const user = await findUser(decoded.username);
    if (!user) {
        return res.status(401).json({msg : "Invalid Token"});
    }

    req.username = user.username;
    next();
}

module.exports = validateToken;