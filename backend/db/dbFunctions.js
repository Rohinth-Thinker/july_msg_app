const { ObjectId } = require('mongodb');
const { createBucket } = require('./database');
const posts = require('./models/postsModel');
const userList = require('./models/userListModels');
const userProfile = require('./models/userProfileModels');
const conversationList = require('./models/conversationListModel');
const messageList = require('./models/messageListModels');
const commentList = require('./models/commentListModel');

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

async function createNewPost(username, postFileId, postCaption, fileType) {
    try {
        const post = await posts.create({ username, postFileId, postCaption, fileType });
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

async function getPaginationUserProfiles(name, startIndex, endIndex) {
    try {
        const regex = new RegExp(`^${name}`, 'i');
        // const profiles = await userProfile.find({ username : regex });

        const [ results, total ] = await Promise.all([
            userProfile.find({ username : regex }).skip(startIndex).limit(endIndex),
            userProfile.find({ username : regex }).countDocuments().exec(),//here need to check that exec is must or not
        ])

        // console.log(results, total);
        return { results, total };
    } catch(err) {
        throw err;
    }
}

async function getUserFollowProfiles(usernames, startIndex, endIndex, searchText) {
    try {
        const regex = new RegExp(`^${searchText}`, 'i');

        const [ profiles, total ] = await Promise.all([
            userProfile.find({ username : { $in : usernames, $regex : regex } }).skip(startIndex).limit(endIndex),
            userProfile.find({ username : { $in : usernames, $regex : regex } }).countDocuments(),
        ])
        
        return { profiles, total };
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

async function paginationPostsResults(startIndex, endIndex) {
    try {
        const [ results, totalPost ] = await Promise.all([
            posts.find().skip(startIndex).limit(endIndex),
            posts.countDocuments().exec(), //here need to check that exec is must or not
        ])

        return { results, totalPost };
    } catch (err) {
        throw err;
    }
}

async function getConversation(sender, receivers) {
    try {
        const conversation = await conversationList.findOne({
            conversation : { $all : [ sender, ...receivers ] } 
        }).select("-messages");
        return conversation;
    } catch (err) {
        throw err;
    }
}

async function createConversation(sender, receivers) {
    try {
        const conversation = await conversationList.create({ conversation : [ sender, ...receivers ] });
        return conversation;
    } catch(err) {
        throw err;
    }
}

async function getConversationsById(id, username) {
    try {
        if (!ObjectId.isValid(id)) {
            return { status : false, statusCode : 400, msg : 'Invalid url' };
        }

        const conversation = await conversationList.findOne({
            _id : id,
            conversation : { $in : username },
        }).populate("messages");

        if (!conversation) {
            return { status : false, statusCode : 400, msg : 'Invalid url' };
        }

        return conversation;
    } catch(err) {
        throw err;
    }
}

async function addMessage(username, id, message) {
    try {
        if (!ObjectId.isValid(id)) {
            return { status : false, statusCode : 400, msg : 'Invalid url' };
        }

        const conversation = await conversationList.findById(id);

        const newMessage = await messageList.create({
            username, message
        })

        conversation.messages.push(newMessage._id);
        await conversation.save();
        
        return { status : true, newMessage, members: conversation.conversation };

    } catch(err) {
        throw err;
    }
}

async function getAllConversationByUsername(username) {
    try {
        const conversations = await conversationList.find({conversation : {$in : username}}).select("-messages");
        return conversations
    } catch(err) {
        throw err;
    }
}

async function addPostLikes(postId, username) {
    try {
        if (!ObjectId.isValid(postId)) {
            return { status : false, statusCode : 400, msg : 'Invalid Post ID' };
        }
        
        const post = await posts.updateOne({_id : postId}, { $push : { postLikes : username } });
        if (post.matchedCount === 0) {
            return { status : false, statusCode : 400, msg : 'Invalid Post ID' }
        }

        return { status : true, post };

    } catch(err) {
        throw err;
    }
}

async function removePostLikes(postId, username) {
    try {
        if (!ObjectId.isValid(postId)) {
            return { status : false, statusCode : 400, msg : 'Invalid Post ID' };
        }

        const post = await posts.updateOne({_id : postId}, { $pull : { postLikes : username } });
        if (post.matchedCount === 0) {
            return { status : false, statusCode : 400, msg : 'Invalid Post ID' }
        }

        return { status : true, post };
    
    } catch(err) {
        throw err;
    }
}

async function addComments(username, postId, commentText) {
    try {
        const post = await posts.findById(postId);
        if (!post) {
            return { status : false, statusCode : 400, msg : 'Invalid Post Id' };
        }
        const { postComments } = post;

        const newComment = await commentList.create({ username, text : commentText });
        postComments.push(newComment._id);
        await post.save()
        
        return {status : true, newComment };
    } catch(err) {
        throw err;
    }
}

async function addReplyComments(parentId, username, commentText) {
    try {
        if (!ObjectId.isValid(parentId)) {
            return { status : false, statusCode : 400, msg : 'Invalid Post ID' };
        }

        const parentComment = await commentList.findById(parentId);
        if(!parentComment) {
            return { status : false, statusCode : 400, msg : 'Invalid comment' };
        }
        const { replies } = parentComment;

        const newComment = await commentList.create({ username, text : commentText, parentId });
        replies.push(newComment._id);
        await parentComment.save();

        return { status : true, newComment }

    } catch(err) {
        throw err;
    }
}

async function getAllComments(postId) {
    try {
        if (!ObjectId.isValid(postId)) {
            return { status : false, statusCode : 400, msg : 'Invalid Post ID' };
        }

        const result = await posts.findById(postId).select("postComments username postCaption").populate("postComments");
        if (!result) {
            return { status : false, statusCode : 400, msg : "Invalid Post Id" };
        }
        const { username, postCaption, postComments } = result;
        
        return { status : true, comments : postComments, post : {username, postCaption} };
        
    } catch(err) {
        throw err;
    }
}

async function getRepliesCommentByCommentId(id) {
    try {
        if (!ObjectId.isValid(id)) {
            return { status : false, statusCode : 400, msg : 'Invalid Post ID' };
        }

        const comment = await commentList.findById(id).select("replies").populate("replies");
        if(!comment) {
            return { status : false, statusCode : 400, msg : 'Invalid comment' };
        }
        const { replies } = comment;
        
        return { status : true, replies };

    } catch(err) {
        throw err;
    }
}

async function updatingProfileSrc(username, filename) {
    try {
        const response = await userProfile.updateOne({username}, { userProfilePic : filename });
        return { status : true }
    } catch(err) {
        throw err;
    }
}

async function updatingProfileFields(username, userBio, userWebsite) {
    try {
        const response = await userProfile.updateOne({ username }, { userBio, userWebsite });
        return { status : true };
    } catch(err) {
        throw err;
    }
}


module.exports = {
    findUser, createUser, findAndVerifyUser, createUserProfile, createNewPost, appendPostId,
    findUserProfile, getPostById, readPostById, getPaginationUserProfiles, getUserFollowProfiles,
    doUnfollow, doFollow, doRemove, paginationPostsResults,
    getConversation, createConversation, getConversationsById, getAllConversationByUsername,
    addMessage,
    addPostLikes, removePostLikes,
    addComments, addReplyComments, getAllComments, getRepliesCommentByCommentId,
    updatingProfileSrc, updatingProfileFields
};