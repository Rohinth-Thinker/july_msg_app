
function uploadPost(req, res) {
    if(!req.file) {
        return res.status(400).json({error : 'Invalid File'})
    }

    const fileId = req.file.id;
    return res.status(200).json({ msg : 'Post is Uploaded successfully', fileId });
}

function uploadProfilePic(req, res) {
    if(!req.file) {
        return res.status(400).json({error : 'Invalid File'})
    }
    console.log(req.file);
    res.json({ filename : req.file.filename });
}

module.exports = { uploadPost, uploadProfilePic };