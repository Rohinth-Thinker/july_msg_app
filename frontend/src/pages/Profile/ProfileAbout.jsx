
import { AboutUpperRightContainer, UserProfilePic } from "./components/AboutComponent";


function ProfileAbout({userAbout}) {

    const { username, userProfilePic, userBio, userFollowers, userFollowing } = userAbout;

    return (
        <div className="profile-about-container border-bottom">
            <div className="profile-about-upper">
                <div className="profile-about-pic-container">
                    <UserProfilePic pic={userProfilePic} />
                </div>
                <AboutUpperRightContainer username={username} userFollowers={userFollowers} userFollowing={userFollowing} />
            </div>
            <div className="profile-about-lower">
                <div className="profile-about-bio-container">
                    <span className="profile-about-bio-account-name">{username}</span>
                    <pre className="profile-about-bio-text">{userBio}</pre>
                </div>
            </div>
        </div>
    )
}

export default ProfileAbout;