import { useEffect } from "react";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { OptionIcon } from "../../../../public/icons/Post";
import { SimilarAccountsIcon } from "../../../../public/icons/ProfilePageIcons";
import { GenerateProfilePhoto, GenerateStoryStyle } from "../../../comp/ProfileGenerator";
import { useAuthContext } from "../../../context/AuthContext";
import { ShowFollowingButton } from "../../List/FollowingPage";



function UserProfilePic({ pic }) {
    return (
        <>
                <GenerateProfilePhoto src={pic} size={80} />
        </>
    )
}

function AboutUpperRightContainer({username, userFollowers, userFollowing}) {
    const { authUser } = useAuthContext();
    const isSeletedUser = authUser.username === username;

    if ( isSeletedUser ) {
    return (
        <div className="profile-about-upper-right-container">
            <div className="profile-about-account-name-container">
                <span className="profile-about-account-name">{username}</span>
            </div>
            <div className="profile-about-buttons-container">
                <Link to={"/accounts/edit"}><button className="profile-about-buttons">Edit Profile</button></Link>
                <button className="profile-about-buttons">View archive</button>
            </div>
        </div>
    )
    }

    return <OtherUsersProfiles username={username} userFollowers={userFollowers} userFollowing={userFollowing} />;

}

function OtherUsersProfiles({ username, userFollowers, userFollowing }) {

    return (
        <div className="profile-about-upper-right-container">
            <div className="profile-about-account-name-container">
                <span className="profile-about-account-name">{username}</span>
                <OptionIcon />
            </div>
            <div className="profile-about-buttons-container">
                <ProfileButton username={username} userFollowers={userFollowers} userFollowing={userFollowing} />
                <button className="profile-about-buttons pg-5-10"> <SimilarAccountsIcon /> </button>
            </div>
        </div>
    )

}

export { UserProfilePic, AboutUpperRightContainer };


function ProfileButton({username, userFollowers, userFollowing}) {

    const [ loading, setLoading ] = useState();
    const { authUser } = useAuthContext();
    const [ isFollowing, setIsFollowing ] = useState(userFollowers.includes(authUser.username));

    async function handleUnfollow() {
        setLoading(true);

        const response = await fetch('/api/users/operations/unfollow', {
            method : "PATCH",
            body : JSON.stringify({ username, }),
            headers : {
                "Content-Type" : "application/json",
            }
        })

        setLoading(false);    
        if (response.ok) {
            setIsFollowing(false);
        }   
    }

    async function handleFollow() {
        setLoading(true);

        const response = await fetch('/api/users/operations/follow', {
            method : "PATCH",
            body : JSON.stringify({ username, }),
            headers : {
                "Content-Type" : "application/json",
            }
        })

        setLoading(false);
        if (response.ok) {
            setIsFollowing(true);
        }
    }


    if ( !isFollowing) {
        const isFollowBack = userFollowing.includes(authUser.username);
        return ( 
            <button onClick={handleFollow} className="profile-about-buttons bg-color-blue flex-1">
                { loading ? 'Loading...' : isFollowBack ? 'Follow Back' : 'Follow' }
            </button>
        )
    }

    return (
        <>
            <button onClick={handleUnfollow} className="profile-about-buttons">
                { loading ? 'Loading...' : 'Following' }
            </button>
            <button className="profile-about-buttons">Message</button>
        </>
    )
}