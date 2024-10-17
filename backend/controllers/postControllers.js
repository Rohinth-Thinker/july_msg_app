const { createNewPost, appendPostId, getPostById, readPostById, paginationPostsResults, addPostLikes, removePostLikes, addComments, getAllComments, addReplyComments, getRepliesCommentByCommentId } = require("../db/dbFunctions");
const { post } = require("../routes/authRoutes");

async function storePost(req, res) {
    try {
        const { username } = req;
        const { fileId, caption } = req.body;

        const newPost = await createNewPost(username, fileId, caption);
        const reponse = await appendPostId(username, newPost._id)
        
        res.status(200).json({msg : "Post is Stored successfully"});
    } catch(err) {
        console.log(`At StorePost Controller, ${err.name} : ${err.message}`);
        res.status(400).json({error : 'An error occured. Try again later...'})
    }
}

async function getPost(req, res) {
    try {
        const { postId } = req.params;
        if (!postId) {
            return res.status(400).json({error : 'Invalid Post Id'})
        }

        const postResponse = await getPostById(postId);
        if (!postResponse.status) {
            return res.status(postResponse.statusCode).json({error : postResponse.msg})
        }

        res.status(200).json({postDetails : postResponse.post});
    } catch(err) {
        console.log(`At getPost Controller, ${err.name} : ${err.message}`);
        res.status(400).json({error : 'An error occured. Try again later...'});
    }
}

async function getReadablePost(req, res) {
    try {
        const { fileId } = req.params;
        const response = readPostById(fileId);
        if (!response.status) {
            return res.status(response.statusCode).json({error : response.msg})
        }

        const readStream = response.readStream;
        readStream.pipe(res);
    } catch(err) {
        console.log(`At readImage controller, ${err.name} : ${err.message}`);
        res.status(400).json({error : 'An error occured. Try again later...'});
    }
}

async function fetchPosts(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const results = await paginationPostsResults( (page - 1) * limit, limit );
        res.json(results);
    } catch (err) {
        console.log(`At fetchPosts controller, ${err.name} : ${err.message}`);
        res.status(400).json({error : 'An error occured. Try again later...'});
    }
}

async function handleLikes(req, res) {
    try {
        const {username} = req;
        const { postId, isLike } = req.body;

        if (!postId) {}

        let response;
        if (isLike) response = await addPostLikes(postId, username);
        else response = await removePostLikes(postId, username);

        if (!response.status) {
            return res.status(reponse.statusCode).json({ error : response.msg });
        }

        res.status(200).json(response);

    } catch(err) {
        console.log(`At handleLikes controller, ${err.name} : ${err.message}`);
        res.status(400).json({error : 'An error occured. Try again later...'});
    }
}

async function addPostComments(req, res) {
    try {
        const { username } = req;
        const { postId, commentText, parentId } = req.body;

        if (!postId || !commentText) {
            return res.status(400).json({ error : "Invalid parameters" });
        }

        let response;
        if(parentId) {
            response = await addReplyComments(parentId, username, commentText);
        } else {
            response = await addComments(username, postId, commentText);
        }

        if (!response.status) {
            return res.status(response.statusCode).json({ error : response.msg });
        }
        
        res.json({ newComment : response.newComment });
    } catch(err) {
        console.log(`At addPostComments controller, ${err.name} : ${err.message}`);
        res.status(400).json({error : 'An error occured. Try again later...'});
    }
}

async function getPostAllComments(req, res) {
    try {
        const { postId } = req.params;
        if (!postId) {
            return res.status(400).json({ error : "Invalid post id" });
        }

        const response = await getAllComments(postId);
        if (!response.status) {
            return res.status(response.statusCode).json({ error : response.msg });
        }

        res.status(200).json({comments : response.comments, post : response.post});

    } catch(err) {
        console.log(`At getPostAllComments controller, ${err.name} : ${err.message}`);
        res.status(400).json({error : 'An error occured. Try again later...'});
    }
}

async function getRepliesComment(req, res) {
    try {
        const { commentId } = req.params;
        if (!commentId) {
            return res.status(400).json({ error : 'Invalid Comment Id' });
        }

        const response = await getRepliesCommentByCommentId(commentId);
        if (!response.status) {
            return res.status(response.statusCode).json({ error : response.msg });
        }

        res.json({replies : response.replies});

    } catch(err) {
        console.log(`At getRepliesComments controller, ${err.name} : ${err.message}`);
        res.status(400).json({error : 'An error occured. Try again later...'});
    }
}

module.exports = {
    storePost, getPost, getReadablePost, fetchPosts, handleLikes,
    addPostComments, getPostAllComments, getRepliesComment,
};