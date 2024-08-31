const { createNewPost, appendPostId, getPostById, readPostById, paginationResults } = require("../db/dbFunctions");
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

        const results = await paginationResults( (page - 1) * limit, page * limit );
        res.json(results);
    } catch (err) {
        console.log(`At fetchPosts controller, ${err.name} : ${err.message}`);
        res.status(400).json({error : 'An error occured. Try again later...'});
    }
}

module.exports = { storePost, getPost, getReadablePost, fetchPosts };