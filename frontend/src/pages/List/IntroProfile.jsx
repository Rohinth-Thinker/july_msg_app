import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GenerateProfilePhoto } from "../../comp/ProfileGenerator";


function IntroProfile({ children, userProfile }) {
    
    return (
        <div className="intro-profile-container">
            <div className="intro-profile-left-section aItems">
                <div className="intro-profile-pic-container">
                    <div className="story-pic-border">
                        <GenerateProfilePhoto src={userProfile.userProfilePic} size={50}/>
                    </div>
                </div>

                <div className="intro-profile-about">
                    <Link to={`/${userProfile.username}`} className="intro-profile-username"> { userProfile.username } </Link>
                    <span className="intro-profile-followers-count"> { userProfile.userFollowers.length } followers </span>
                </div>
            </div>

            {children}
        </div>
    )
}


export default IntroProfile;