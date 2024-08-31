import { Link } from "react-router-dom";

function ProfilePostThumbnail({postId, postSrc}) {
    return (
        <div className="post-thumbnail-container">
            <Link to={`/p/${postId}`} ><img className="post-thumbnail-pic" src={postSrc} /></Link>
        </div>
    )
}


export default ProfilePostThumbnail;