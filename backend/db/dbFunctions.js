const { ObjectId } = require('mongodb');
const { createBucket } = require('./database');
const posts = require('./models/postsModel');
const userList = require('./models/userListModels');
const userProfile = require('./models/userProfileModels');


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

async function createUserProfile(username) {
    try {
        const profile = await userProfile.create({username});
        return profile;
    } catch(err) {
        throw err;
    }
}

async function createNewPost(username, postFileId, postCaption) {
    try {
        const post = await posts.create({ username, postFileId, postCaption });
        return post;
    } catch(err) {
        throw err;
    }
}

async function appendPostId(username, postId) {
    try {
        const response = await userProfile.updateOne({ username }, {$push : {userPost : postId}});
        return true;
    } catch(err) {
        throw err;
    }
}

async function findUserProfile(username) {
    try {
        const profile = await userProfile.findOne({ username });
        return profile;
    } catch(err) {
        throw err;
    }
}

async function getPostById(id) {
    try {
        if (!ObjectId.isValid(id)) {
            return { status : false, statusCode : 400, msg : 'Invalid url' };
        }

        const post = await posts.findById(id);
        if (!post) {
            return { status : false, statusCode : 400, msg : 'Invalid Url'};
        }

        return { status : true, post : post };
    } catch(err) {
        throw err;
    }
}

function readPostById(id) {
    try {
        if (!ObjectId.isValid(id)) {
            return { status : false, statusCode : 400, msg : 'Invalid Url' };
        }

        const fileId = new ObjectId(id);
        const bucket = createBucket('uploadPost');

        const readStream = bucket.openDownloadStream(fileId);
        readStream.on('error', (error) => {
            let errorMsg;
            if (error.code === 'ENOENT') {
                errorMsg = "File Doesn't Exist";
            } else {
                errorMsg = error.message;
            }
            return { status : false, statusCode : 400, msg : errorMsg };
        })

        return { status : true, readStream };

    } catch(err) {
        throw err;
    }
}

async function getUserProfiles(name) {
    try {
        const regex = new RegExp(`^${name}`, 'i');
        const profiles = await userProfile.find({ username : regex });
        return profiles;
    } catch(err) {
        throw err;
    }
}

async function getUserFollowProfiles(usernames) {
    try {
        const userFollowProfiles = await userProfile.find({
            username : {$in : usernames}
        })
        return userFollowProfiles;
    } catch(err) {
        throw err;
    }
}

async function doFollow(username, otherUser) {
    try {
        const results = await Promise.all([
            userProfile.updateOne({username}, {$push : { userFollowing : otherUser }}),
            userProfile.updateOne({ username : otherUser}, {$push : { userFollowers : username }}),
        ])
        
        return true;
    } catch(err) {
        throw err;
    }
}

async function doUnfollow(username, otherUser) {
    try {
        const results = await Promise.all([
            userProfile.updateOne({username}, {$pull : { userFollowing : otherUser }}),
            userProfile.updateOne({ username : otherUser}, {$pull : { userFollowers : username }}),
        ])
        
        return true;
    } catch(err) {
        throw err;
    }
}


async function doRemove(username, otherUser) {
    try {
        const results = await Promise.all([
            userProfile.updateOne({username : otherUser}, {$pull : { userFollowing : username }}),
            userProfile.updateOne({ username }, {$pull : { userFollowers : otherUser }}),
        ])
        
        return true;
    } catch(err) {
        throw err;
    }
}

async function paginationResults(startIndex, endIndex) {
    try {
        // const results = await posts.find().skip(startIndex).limit(endIndex);
        // const TotalPost = await posts.countDocuments().exec();
        const [ results, totalPost ] = await Promise.all([
            posts.find().skip(startIndex).limit(endIndex),
            posts.countDocuments().exec(),
        ])

        return { results, totalPost };
    } catch (err) {
        throw err;
    }
}

module.exports = {
    findUser, createUser, findAndVerifyUser, createUserProfile, createNewPost, appendPostId,
    findUserProfile, getPostById, readPostById, getUserProfiles, getUserFollowProfiles,
    doUnfollow, doFollow, doRemove, paginationResults
};