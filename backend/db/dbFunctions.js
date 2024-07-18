const userList = require('./models/userListModels');


async function findUser(username) {
    try {
        const user = await userList.findOne({username}).select("-password");
        return user;
    } catch(err) {
        throw err;
    }
}

async function createUser(username, password) {
    try {
    const user = await userList.create({username, password});
    return user;
    } catch(err) {
        throw err;
    }
}

async function findAndVerifyUser(username, password) {
    try {
        const user = await userList.findOne({username});
        if (!user) {
            return { status : false, statusCode : 401, msg : "User is not found..." };
        }

        if (user.password !== password) {
            return { status : false, statusCode : 401, msg : "Invalid Credentials" };
        }

        return { status : true, id : user._id };

    } catch(err) {
        throw err;
    }
}

module.exports = { findUser, createUser, findAndVerifyUser };