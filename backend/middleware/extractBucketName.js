
function extractBucketName(req, res, next) {
    const { url } = req;
    
    switch(url) {
        case '/post' :
            req.bucketName = 'uploadPost';
            break;
    }
    next();
}

module.exports = extractBucketName;