import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { BackButtonIcon } from "../../../../public/icons/ProfilePageIcons";
import useUploadPost from "../../../hooks/useUploadPost";

function PostDetailsHeader({ header, handleShare, loading }) {

    const navigate = useNavigate();

    function navigateToPreviousPage() {
        navigate(-1);
    }

    if (loading) {
        return (
            <div className="profile-header border-bottom">
                <div className="profile-header-middle-section">
                    <span className="font-size-17"> Sharing... </span>
                </div>
            </div>
        )
    }

    return (
        <div className="profile-header border-bottom">
            <div className="profile-header-left-section" onClick={navigateToPreviousPage} >
                <BackButtonIcon />
            </div>
            <div className="profile-header-middle-section">
                <span className="font-size-17"> {header} </span>
            </div>
            <div className="profile-header-right-section" >
                <Link className="next-link" onClick={handleShare} >Share</Link>
            </div>
        </div>
    )
}

function PostDetailsMainContainer({ mediaFile, captionText, handleChange }) {

    return (
        <div className="post-details-main-container">
            <div className="create-post-details-container">
                <div className="pic-profile-container">
                    <div className="pic-profile">
                            <div className="story-profile-pic-container WH-35">
                                <FaUser style={{color:"white", width:'72%', height:'72%'}} />
                                {/* <img src="profile-pic.jpg" style={{width: "100%", height: "100%", borderRadius: '50%'}} /> */}
                            </div>
                    </div>
                </div>
                <div className="caption-textarea-container"> <textarea className="caption-textarea" value={captionText} onChange={handleChange} /> </div>
                <div className="create-post-thumbnail-container" >
                    <PostDetailsThumbnail media={mediaFile} />
                </div>
            </div>
        </div>
    )
}

function PostDetailsThumbnail({ media }) {
    const src = URL.createObjectURL(media);

    return (
        <>
            { showMedia(media, src) }
        </>
    )
}


function showMedia(media, src) {
    if (media.type.startsWith('image/')) {
        return <img src={src} className="create-details-thumbnail" />;
    } else {
        return <video src={src} className="create-details-thumbnail" ></video>;
    }
}

export { PostDetailsHeader, PostDetailsMainContainer };