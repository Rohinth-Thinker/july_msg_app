const { findUserProfile, getUserProfiles, getUserFollowProfiles, doUnfollow, doFollow, doRemove } = require("../db/dbFunctions");

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
        if (!search) return res.status(200).json(null);

        const userProfiles = await getUserProfiles(search);
        res.status(200).json(userProfiles);
    } catch(err) {
        console.log(`At searchUserProfile controller, ${err.name} : ${err.message}`);
        res.status(400).json({error : 'an error occured'});
    }
}

async function getFollowersProfile(req, res) {
    try {
        const { username } = req.params;
        const userProfile = await findUserProfile(username);
        if (!userProfile) {
            return res.status(400).json({error : 'Invalid Url'});
        }
        
        const userFollowProfiles = await getUserFollowProfiles(userProfile.userFollowers);
        res.status(200).json(userFollowProfiles);
    } catch(err) {
        console.log(`At getFollowersProfile Controller, ${err.name} : ${err.message}`);
        res.status(400).json({error : 'an error occurred, try again later'});
    }
}

async function getFollowingProfile(req, res) {
    try {
        const { username } = req.params;
        const userProfile = await findUserProfile(username);
        if (!userProfile) {
            return res.status(400).json({error : 'Invalid Url'});
        }
        
        const userFollowProfiles = await getUserFollowProfiles(userProfile.userFollowing);
        res.status(200).json(userFollowProfiles);
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

module.exports = {
    getUserProfile, searchUserProfile, getFollowersProfile, getFollowingProfile,
    handleFollow, handleUnfollow, handleRemove,
};