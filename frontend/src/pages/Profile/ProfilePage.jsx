import ProfileHeader from "./ProfileHeader";
import '../../styles/ProfilePage.css';
import ProfileAbout from "./ProfileAbout";
import ProfileStatus from "./ProfileStatus";
import ProfileTabList from "./ProfileTabList";
import ProfilePost from "./ProfilePost";
import { useParams } from "react-router-dom";
import userProfiles from "../../details/userProfile";

function ProfilePage() {
    const profiles = userProfiles;
    const {requestUsername} = useParams();
    
    const userProfile = profiles.find((profile) => profile.username === requestUsername);
    if (!userProfile) {
        return <div>SORRY WRONG URL</div>
    }
    const { _id, username, profilePic, bio, post, following, followers } = userProfile;

    return (
        <div className="profile-page">
            <ProfileHeader username={userProfile.username} />
            <ProfileAbout userAbout={{ _id, username, profilePic, bio }} />
            <ProfileStatus userStatus={{ post, followers, following }} />
            <ProfileTabList username={userProfile.username} />
            <ProfilePost post={post} />
        </div>
    )
}

export default ProfilePage;