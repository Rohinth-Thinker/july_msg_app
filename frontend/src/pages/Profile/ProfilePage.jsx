import ProfileHeader from "./ProfileHeader";
import '../../styles/ProfilePage.css';
import ProfileAbout from "./ProfileAbout";
import FooterContainer from '../Home/FooterContainer';
import ProfileStatus from "./ProfileStatus";
import ProfileTabList from "./ProfileTabList";
import ProfilePost from "./ProfilePost";
import { useParams } from "react-router-dom";
import userProfiles from "../../details/userProfile";

function ProfilePage() {
    const profiles = userProfiles;
    const {requestUsername} = useParams();
    
    const userPofile = profiles.find((profile) => profile.username === requestUsername);
    const { _id, username, profilePic, bio, post, following, followers } = userPofile;
    // console.log(userPofile)

    if (!userPofile) {
        return <div>SORRY WRONG URL</div>
    }

    return (
        <div className="profile-page">
            <ProfileHeader username={userPofile.username} />
            <ProfileAbout userAbout={{ _id, username, profilePic, bio }} />
            <ProfileStatus userStatus={{ post, followers, following }} />
            <ProfileTabList />
            <ProfilePost post={post} />
        </div>
    )
}

export default ProfilePage;