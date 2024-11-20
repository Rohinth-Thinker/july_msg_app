
const { Router } = require('express');
const { uploadPost, uploadProfilePic } = require('../controllers/uploadControllers');
const upload = require('../db/upload/upload.js');
const localUpload = require('../db/upload/localUpload');
const extractBucketName = require('../middleware/extractBucketName');

const router = Router();

router.post('/post', extractBucketName, upload.single('media'), uploadPost);
router.post('/profile-pic', localUpload.single('media'), uploadProfilePic);


module.exports = router;