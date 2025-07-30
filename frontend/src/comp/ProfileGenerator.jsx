import { FaUser } from "react-icons/fa";

function GenerateProfilePhoto({src, size}) {

    // <img src={`/api/store/media/profile/${src}`} style={{width: "100%", height: "100%", borderRadius: '50%'}} />

    return (
        <div className={`story-profile-pic-container WH-${size}`}>
            {src ? 
                <img src={src} style={{width: "100%", height: "100%", borderRadius: '50%', objectFit: 'cover'}} />
                    :
                <FaUser style={{color:"white", width:'72%', height:'72%'}} />
            }
        </div>
    )
}

function GenerateStoryStyle({ storyType, children }) {

    return (
        <div className={`story-pic-border ${storyType}`}>
            { children }
        </div>
    )
}

export { GenerateProfilePhoto, GenerateStoryStyle };