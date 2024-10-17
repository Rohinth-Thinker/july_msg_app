import { useRef } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { WrongIcon } from "../../../../public/icons/HomePageIcon";
import { HiPlay } from "react-icons/hi2";

function PostStylesHeader({ header }) {

    function handleWrongIcon(e) {
        e.preventDefault();
        window.location.href = '/home';
    }

    return (
        <div className="profile-header border-bottom">
            <div className="profile-header-left-section" onClick={handleWrongIcon} >
                <WrongIcon />
            </div>
            <div className="profile-header-middle-section">
                <span className="font-size-17"> {header} </span>
            </div>
            <div className="profile-header-right-section">
                <Link to='/create/details' className="next-link">Next</Link>
            </div>
        </div>
    )
}


function PostStylesMainContainer({ media }) {

    const src = URL.createObjectURL(media)

    return (
        <div className="create-post-image-container" >
            { showMedia(media, src) }
        </div>
    )
}

function showMedia(media, src) {
    if (media.type.startsWith('image/')) {
        return <img src={src} className="create-post-image" />;
    } else {
        return <VideoComponent src={src} />;
    }
}

function VideoComponent({ src }) {
    const [ isPlaying, setIsPlaying ] = useState(false);
    const videoRef = useRef(null);

    function handleVideoControls(e) {
        if(isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
    }

    return (
        <div onClick={(handleVideoControls)} >
            <video ref={videoRef} src={src} className="create-post-image" loop></video>
            { !isPlaying &&
                <HiPlay className="play-icon" />
            }
        </div>
    )
}

function PostStylesFooter() {

    const [ showSelectionStyle, setShowSelectionStyle ] = useState(true);

    return (
        <>
        <div className="create-post-footer-container">
            <div>
                <div className={ showSelectionStyle ? '' : 'show-selection-style' }
                    onClick={() => setShowSelectionStyle(false)}> 
                    <button className="default-button-style" >Filter</button> 
                </div>

                <div className={ showSelectionStyle ? 'show-selection-style' : '' }
                    onClick={() => setShowSelectionStyle(true)}> 
                    <button className="default-button-style" >Edit</button> 
                </div>
            </div>
        </div>
        </>
    )
}

export { PostStylesHeader, PostStylesMainContainer, PostStylesFooter };