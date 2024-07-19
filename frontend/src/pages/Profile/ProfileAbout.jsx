
import { UserProfilePic } from "./components/AboutComponent";


function ProfileAbout({userAbout}) {

    return (
        <div className="profile-about-container border-frame">
            <div className="profile-about-upper">
                <div className="profile-about-pic-container">
                    <div className="story-pic-border">
                        <div className="story-profile-pic-container WH-80">
                            <UserProfilePic pic={userAbout.profilePic} />
                        </div>
                    </div>
                </div>
                <div className="profile-about-change-container">
                    <div className="profile-about-account-name-container">
                        <span className="profile-about-account-name">{userAbout.username}</span>
                    </div>
                    <div className="profile-about-buttons-container">
                        <button className="profile-about-buttons">Edit Profile</button>
                        <button className="profile-about-buttons">View archive</button>
                    </div>
                </div>
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