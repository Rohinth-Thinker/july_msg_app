import { FaUser } from "react-icons/fa";

function GenerateProfilePhoto({src, size}) {
    
    return (
        <div className={`story-profile-pic-container WH-${size}`}>
            <FaUser style={{color:"white", width:'72%', height:'72%'}} />
            {/* <img src="profile-pic/pic1.jpg" style={{width: "100%", height: "100%", borderRadius: '50%'}} /> */}
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