import { forwardRef } from "react";
import { HiPlay } from "react-icons/hi2";
import { Link } from "react-router-dom";

function ProfilePostThumbnail({postId, postSrc, fileType}, ref) {

    if(fileType.startsWith('video/')) {

        return (
            <div ref={ref} className="post-thumbnail-container">
                <Link to={`/p/${postId}`} ><video className="post-thumbnail-pic" src={postSrc}></video></Link>
                <HiPlay className="thumbnail-play-icon" />
            </div>
        )
    }

    return (
        <div ref={ref} className="post-thumbnail-container">
            <Link to={`/p/${postId}`} ><img className="post-thumbnail-pic" src={postSrc} /></Link>
        </div>
    )
}


export default forwardRef(ProfilePostThumbnail);