import { forwardRef } from "react";
import { Link } from "react-router-dom";

function ProfilePostThumbnail({postId, postSrc}, ref) {
    return (
        <div ref={ref} className="post-thumbnail-container">
            <Link to={`/p/${postId}`} ><img className="post-thumbnail-pic" src={postSrc} /></Link>
        </div>
    )
}


export default forwardRef(ProfilePostThumbnail);