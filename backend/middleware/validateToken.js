
function validateToken(req, res, next) {
    req.username = 'rohinth_thinker';
    next();
}

module.exports = validateToken;