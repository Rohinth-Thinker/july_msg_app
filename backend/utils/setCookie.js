
function setCookie(res, token, maxAge = 60 * 60 * 1000) {
    res.cookie('token', token, {
        maxAge,
        httpOnly : true,
        sameSite : "strict",
    })

    return true;
}

module.exports = setCookie;