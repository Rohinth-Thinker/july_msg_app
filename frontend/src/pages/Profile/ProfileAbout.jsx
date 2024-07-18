
import { FaUser } from "react-icons/fa";


function ProfileAbout() {

    const text = `I Am,
A man who has Everything and Nothing
🤥`

    return (
        <div className="profile-about-container border-frame">
            <div className="profile-about-upper">
                <div className="profile-about-pic-container">
                    <div className="story-pic-border">
                        <div className="story-profile-pic-container WH-80">
                            <FaUser style={{color:"white", width:'72%', height:'72%'}} />
                        </div>
                    </div>
                </div>
                <div className="profile-about-change-container">
                    <div className="profile-about-account-name-container">
                        <span className="profile-about-account-name">disturbing_heart</span>
                    </div>
                    <div className="profile-about-buttons-container">
                        <button className="profile-about-buttons">Edit Profile</button>
                        <button className="profile-about-buttons">View archive</button>
                    </div>
                </div>
            </div>
            <div className="profile-about-lower">
                <div className="profile-about-bio-container">
                    <span className="profile-about-bio-account-name">Rohinth Thinker</span>
                    <pre className="profile-about-bio-text">{text}</pre>
                </div>
            </div>
        </div>
    )
}

export default ProfileAbout;