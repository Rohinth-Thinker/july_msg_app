import { useState } from "react";
import { useMediaContext } from "../../../context/MediaContext";
import useUploadPost from "../../../hooks/useUploadPost";
import { PostDetailsHeader, PostDetailsMainContainer } from "./PostDetailsComponents";

function PostDetails() {
    
    const [ captionText, setCaptionText ] = useState('');
    const { mediaFile } = useMediaContext();
    const [ loading, uploadPost ] = useUploadPost();
    if (!mediaFile) {
        window.location.href = '/home';
        return;
    }

    function handleCaptionChange(e) {
        setCaptionText(e.target.value);
    }


    async function handleShare(e) {
        try {
            const response = await uploadPost(mediaFile, captionText);
            if (!response.status) {
                console.log(response.msg)
                return;
            }

            location.href = '/home';
            return;
        } catch(err) {
            console.log(`${err.name} : ${err.message}`);
        }
    }

    return (
        <div className="post-details">
            <PostDetailsHeader header={'New Post'} handleShare={handleShare} loading={loading} />
            <div className="pTop-45" >
                <PostDetailsMainContainer mediaFile={mediaFile} captionText={captionText} handleChange={handleCaptionChange} />
            </div>
        </div>
    )
}

export default PostDetails;