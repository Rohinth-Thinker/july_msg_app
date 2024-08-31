import ProfileHeader from "./ProfileHeader";
import '../../styles/ProfilePage.css';
import ProfileAbout from "./ProfileAbout";
import ProfileStatus from "./ProfileStatus";
import ProfileTabList from "./ProfileTabList";
import ProfilePost from "./ProfilePost";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

function ProfilePage() {
    const [ userProfile, setUserProfile ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const {requestUsername} = useParams();

    useEffect(() => {
        async function fetchUserProfile() {
            setLoading(true);

            const response = await fetch(`http://localhost:3000/api/users/${requestUsername}`);
            const profile = await response.json();
            setLoading(false);

            if (profile.error) {
                return;
            }
            setUserProfile(profile);
        }

        if (requestUsername) fetchUserProfile();
    }, [ requestUsername ])
    
    if (loading) return <div style={{textAlign : 'center'}}>Loading...</div>

    if (!userProfile) {
        return <div>SORRY WRONG URL</div>
    }
    const { _id, username, userProfilePic, userBio, userPost, userFollowers, userFollowing } = userProfile;

    return (
        <div className="profile-page">
            <ProfileHeader username={username} />
            <ProfileAbout userAbout={{ username, userProfilePic, userBio, userFollowers, userFollowing }} />
            <ProfileStatus userStatus={{ username, userPost, userFollowers, userFollowing }} />
            <ProfileTabList username={username} />
            <ProfilePost post={['post(1)', 'post(2)']} postIds={userPost} />
        </div>
    )
}

export default ProfilePage;