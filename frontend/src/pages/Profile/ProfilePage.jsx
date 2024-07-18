import ProfileHeader from "./ProfileHeader";
import '../../styles/ProfilePage.css';
import ProfileAbout from "./ProfileAbout";
import FooterContainer from '../Home/FooterContainer';
import ProfileStatus from "./ProfileStatus";
import ProfileTabList from "./ProfileTabList";
import ProfilePost from "./ProfilePost";

function ProfilePage() {
    return (
        <div className="profile-page">
            <ProfileHeader />
            <ProfileAbout />
            <ProfileStatus />
            <ProfileTabList />
            <ProfilePost />
        </div>
    )
}

export default ProfilePage;