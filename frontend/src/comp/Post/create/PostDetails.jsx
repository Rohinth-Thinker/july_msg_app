import { useState } from "react";
import { useMediaContext } from "../../../context/MediaContext";
import { PostDetailsHeader, PostDetailsMainContainer } from "./PostDetailsComponents";

function PostDetails() {
    
    const { mediaFile } = useMediaContext();
    if (!mediaFile) return window.location.href = '/home';
    const [ captionText, setCaptionText ] = useState('');

    function handleCaptionChange(e) {
        setCaptionText(e.target.value);
    }

    return (
        <div className="post-details">
            <PostDetailsHeader header={'New Post'} captionText={captionText} mediaFile={mediaFile}/>
            <div className="pTop-45" >
                <PostDetailsMainContainer mediaFile={mediaFile} captionText={captionText} handleChange={handleCaptionChange} />
            </div>
        </div>
    )
}

export default PostDetails;