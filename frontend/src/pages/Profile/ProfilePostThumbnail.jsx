
function ProfilePostThumbnail({post}) {
    console.log(post);
    return (
        <div className="post-thumbnail-container">
            <a><img className="post-thumbnail-pic" src={`/posts/${post.postSrc}`} /></a>
        </div>
    )
}


export default ProfilePostThumbnail;