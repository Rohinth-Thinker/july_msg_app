const { Router } = require('express');
const { getUserProfile, searchUserProfile, getFollowersProfile, getFollowingProfile, handleFollow, handleUnfollow, handleRemove } = require('../controllers/usersControllers');
const validateToken = require('../middleware/validateToken');

const router = Router();

router.get('/:username', validateToken, getUserProfile);
router.get('/', searchUserProfile);
router.get('/:username/followers', validateToken, getFollowersProfile);
router.get('/:username/following', validateToken, getFollowingProfile);
router.patch('/operations/follow', validateToken, handleFollow);
router.patch('/operations/unfollow', validateToken, handleUnfollow);
router.patch('/operations/remove', validateToken, handleRemove);

module.exports = router;