
const multer = require('multer')
const { GridFsStorage } = require('multer-gridfs-storage');
const crypto = require('crypto');
const path = require('path');
const dotenv = require('dotenv').config();

const storage = new GridFsStorage({
    url : process.env.DB_URI + 'july_msg_app',

    file : (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) return reject(err);

                const filename = buf.toString('hex') + path.extname(file.originalname);
                const { bucketName } = req;
                const fileInfo = {
                    filename,
                    bucketName : bucketName || 'defaultBucketName',
                }

                resolve(fileInfo);
            })
        })
    }
})

module.exports = multer({ storage });