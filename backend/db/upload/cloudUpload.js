
const multer = require('multer');
const multerS3 = require('multer-s3')
const { S3Client } = require('@aws-sdk/client-s3');

const crypto = require('crypto');
const path = require('path');

const s3 = new S3Client();

const storage = multerS3({
    s3,

    bucket: 'profile-photos',

    key: (req, file, cb) => {
        crypto.randomBytes(16, (err, buf) => {
            if (err) return cb(err);

            const filename = buf.toString('hex') + path.extname(file.originalname);
            cb(null, filename);
        })
    }

})

module.exports = multer({ storage });