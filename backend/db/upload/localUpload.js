const multer = require('multer');
const crypto = require('crypto');
const path = require('path');

const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, '/home/rohinth/python_program_trail/practice/store/media/profile');
    },

    filename : (req, file, cb) => {
        crypto.randomBytes(16, (err, buf) => {
            if (err) return;

            const filename = buf.toString('hex') + path.extname(file.originalname);
            cb(null, filename);
        })
    }
})

module.exports = multer({ storage });