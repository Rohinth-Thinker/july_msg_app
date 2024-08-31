
function uploadPost(req, res) {
    if(!req.file) {
        return res.status(400).json({error : 'Invalid File'})
    }

    const fileId = req.file.id;
    return res.status(200).json({ msg : 'Post is Uploaded successfully', fileId });
}

module.exports = { uploadPost };