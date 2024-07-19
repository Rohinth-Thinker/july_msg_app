import { FaUser } from "react-icons/fa";
import { OptionIcon } from "../../../../public/icons/Post";
import { SimilarAccountsIcon } from "../../../../public/icons/ProfilePageIcons";
import { useAuthContext } from "../../../context/AuthContext";
import userProfiles from "../../../details/userProfile";



function UserProfilePic({ pic }) {
    if (!pic) {
        return <FaUser style={{color:"white", width:'72%', height:'72%'}} />;
    }

    return <img src={`/profile-pic/${pic}`} style={{width: "100%", height: "100%", borderRadius: '50%'}} />
}

function AboutUpperRightContainer({username}) {
    const { authUser } = useAuthContext();
    const isSeletedUser = (authUser.username === username) ? true : false ;

    if ( isSeletedUser ) {
    return (
        <div className="profile-about-upper-right-container">
            <div className="profile-about-account-name-container">
                <span className="profile-about-account-name">{username}</span>
            </div>
            <div className="profile-about-buttons-container">
                <button className="profile-about-buttons">Edit Profile</button>
                <button className="profile-about-buttons">View archive</button>
            </div>
        </div>
    )
    }


    const userProfile = userProfiles.find((user) => authUser.username === user.username);
    const isFollowing = userProfile.following.includes(username);
    const isFollowers = userProfile.followers.includes(username);

    function profileButton() {
        if ( !isFollowing && !isFollowers ) {
            return <button className="profile-about-buttons bg-color-blue flex-1">Follow </button>;
        }

        if ( !isFollowing && isFollowers ) {
            return <button className="profile-about-buttons bg-color-blue flex-1">Follow Back </button>;
        }

        return (
            <>
                <button className="profile-about-buttons">Following </button>
                <button className="profile-about-buttons">Message</button>
            </>
        )

    }

    return (
        <div className="profile-about-upper-right-container">
            <div className="profile-about-account-name-container">
                <span className="profile-about-account-name">{username}</span>
                <OptionIcon />
            </div>
            <div className="profile-about-buttons-container">
                { profileButton() }
                <button className="profile-about-buttons pg-5-10"> <SimilarAccountsIcon /> </button>
            </div>
        </div>
    )
}

export { UserProfilePic, AboutUpperRightContainer }