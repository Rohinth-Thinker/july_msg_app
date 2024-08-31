
const { Router } = require('express');
const { uploadPost } = require('../controllers/uploadControllers');
const upload = require('../db/upload/upload.js');
const extractBucketName = require('../middleware/extractBucketName');

const router = Router();

router.post('/post', extractBucketName, upload.single('media'), uploadPost);

module.exports = router;