import { Link } from "react-router-dom";

function ProfilePostThumbnail({post}) {
    console.log(post);
    return (
        <div className="post-thumbnail-container">
            <Link to={`/p/${post._id}`} ><img className="post-thumbnail-pic" src={`/posts/${post.postSrc}`} /></Link>
        </div>
    )
}


export default ProfilePostThumbnail;