import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";


function IntroProfile({ children, userProfile }) {
    
    return (
        <div className="intro-profile-container">
            <div className="intro-profile-left-section aItems">
                <div className="intro-profile-pic-container">
                    <div className="story-pic-border">
                        <div className="story-profile-pic-container WH-50">
                            <FaUser style={{color:"white", width:'72%', height:'72%'}} />
                        </div>
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