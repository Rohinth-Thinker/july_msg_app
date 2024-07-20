
import { AboutUpperRightContainer, UserProfilePic } from "./components/AboutComponent";


function ProfileAbout({userAbout}) {

    return (
        <div className="profile-about-container border-bottom">
            <div className="profile-about-upper">
                <div className="profile-about-pic-container">
                    <div className="story-pic-border">
                        <div className="story-profile-pic-container WH-80">
                            <UserProfilePic pic={userAbout.profilePic} />
                        </div>
                    </div>
                </div>
                <AboutUpperRightContainer username={userAbout.username} />
            </div>
            <div className="profile-about-lower">
                <div className="profile-about-bio-container">
                    <span className="profile-about-bio-account-name">{userAbout.username}</span>
                    <pre className="profile-about-bio-text">{userAbout.bio}</pre>
                </div>
            </div>
        </div>
    )
}

export default ProfileAbout;