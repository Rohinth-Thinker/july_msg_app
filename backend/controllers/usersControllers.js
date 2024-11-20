const { findUserProfile, getPaginationUserProfiles, getUserFollowProfiles, doUnfollow, doFollow, doRemove, updatingProfileSrc, updatingProfileFields } = require("../db/dbFunctions");

async function getUserProfile(req, res) {
    const { username } = req.params;
    try {
        const userProfile = await findUserProfile(username);
        if (!userProfile) {
            return res.status(401).json({error : 'User Not Found'});
        }

        return res.status(200).json(userProfile);
    } catch(err) {
        console.log(`At getUserProfile Controllers, ${err.name} : ${err.message} `);
        res.status(400).json({error : 'an error occured'});
    }
}

async function searchUserProfile(req, res) {
    try {
        const { search } = req.query;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 3;

        if (!search) return res.status(200).json(null);

        const response = await getPaginationUserProfiles(search, (page - 1) * limit, limit);
        res.status(200).json({ profiles : response.results, total : response.total });
    } catch(err) {
        console.log(`At searchUserProfile controller, ${err.name} : ${err.message}`);
        res.status(400).json({error : 'an error occured'});
    }
}

async function getFollowersProfile(req, res) {
    try {
        const search = req.query.search || '';
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 3;

        const { username } = req.params;
        const userProfile = await findUserProfile(username);
        if (!userProfile) {
            return res.status(400).json({error : 'Invalid Url'});
        }
        
        const results = await getUserFollowProfiles(userProfile.userFollowers, (page - 1) * limit, limit, search);
        res.status(200).json(results);
    } catch(err) {
        console.log(`At getFollowersProfile Controller, ${err.name} : ${err.message}`);
        res.status(400).json({error : 'an error occurred, try again later'});
    }
}

async function getFollowingProfile(req, res) {
    try {
        const search = req.query.search || '';
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 3;

        const { username } = req.params;
        const userProfile = await findUserProfile(username);
        if (!userProfile) {
            return res.status(400).json({error : 'Invalid Url'});
        }
        
        const results = await getUserFollowProfiles(userProfile.userFollowing, (page - 1) * limit, limit, search);
        res.status(200).json(results);
    } catch(err) {
        console.log(`At getFollowingProfile Controller, ${err.name} : ${err.message}`);
        res.status(400).json({error : 'an error occurred, try again later'});
    }
}

async function handleFollow(req, res) {
    try {
        const { username } = req;
        const otherUser = req.body.username;

        const response = await doFollow(username, otherUser);
        res.status(200).json({ msg : 'successful' });
    } catch(err) {
        console.log(`At handleFollow Controller, ${err.name} : ${err.message}`);
        res.status(400).json({error : 'An error occurred, try again later'});
    }
}

async function handleUnfollow(req, res) {
    try {
        const { username } = req;
        const otherUser = req.body.username;

        const response = await doUnfollow(username, otherUser);
        res.status(200).json({ msg : 'successful' });
    } catch(err) {
        console.log(`At handleUnfollow Controller, ${err.name} : ${err.message}`);
        res.status(400).json({error : 'An error occurred, try again later'});
    }
}

async function handleRemove(req, res) {
    try {
        const { username } = req;
        const otherUser = req.body.username;

        const response = await doRemove(username, otherUser);
        res.status(200).json({ msg : 'successful' });
    } catch(err) {
        console.log(`At handleRemove Controller, ${err.name} : ${err.message}`);
        res.status(400).json({error : 'An error occurred, try again later'});
    }
}

async function updateProfilePicSrc(req, res) {
    try {
        const { username } = req;
        const { filename } = req.body;
        if (!filename) {
            return res.status(400).json({error : 'Invalid file source'});
        }

        const response = await updatingProfileSrc(username, filename);
        res.status(200).json({ msg : 'successful' });

    } catch(err) {
        console.log(`At updateProfilePicSrc Controller, ${err.name} : ${err.message}`);
        res.status(400).json({error : 'An error occurred, try again later'});   
     }
}

async function updateProfileFields(req, res) {
    try {
        const {username} = req;
        const { bio, website } = req.body;
        
        const response = await updatingProfileFields(username, bio, website);
        res.status(200).json({ msg : 'successful' });
    } catch(err) {
        console.log(`At updateProfileFields Controller, ${err.name} : ${err.message}`);
        res.status(400).json({error : 'An error occurred, try again later'});   
    }
}

module.exports = {
    getUserProfile, searchUserProfile, getFollowersProfile, getFollowingProfile,
    handleFollow, handleUnfollow, handleRemove,
    updateProfilePicSrc, updateProfileFields,
};