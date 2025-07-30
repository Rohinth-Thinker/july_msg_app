
import { useState } from "react";
import { useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { HomeIcon, MessengerIcon, ReelsIcon, SearchIcon } from "../../../public/icons/FooterIcon";
import { useAuthContext } from "../../context/AuthContext";
import { GenerateProfilePhoto, GenerateStoryStyle } from "../ProfileGenerator";


function FooterContainer({tab}) {

    const { authUser } = useAuthContext();
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        async function fetchUserProfile() {
            const response = await fetch(`/api/users/${authUser.username}`);
            const result = await response.json();
            setUserProfile(result);
        }

        fetchUserProfile();
    }, [authUser])

    const profileTabStyle = {
        borderRadius : "50%",
        width:"21px",
        height:"21px",
        backgroundColor:"rgb(218, 214, 214)",
        outline : (tab === 'profile') ? '3px solid white' : '', 
    }

    return (
        <div className="footer-container">
            <div className="footer-icon-container"><Link to={"/home"}><HomeIcon selected={tab === 'home'} /></Link></div>
            <div className="footer-icon-container"><Link to={"/explore"}><SearchIcon selected={tab === 'explore'} /></Link></div>
            <div className="footer-icon-container"> <a> <ReelsIcon /> </a> </div>
            <div className="footer-icon-container"> <Link to={"/direct/inbox"} > <MessengerIcon /> </Link> </div>
            <div className="footer-icon-container">
                <Link to={`/${authUser?.username}`}>
                    <GenerateStoryStyle storyType={'seen'}>
                        <GenerateProfilePhoto src={userProfile?.userProfilePic} size={28} />
                    </GenerateStoryStyle>
                </Link>
            </div>
            {/* <div className="footer-icon-container"><Link to={`/${authUser?.username}`}><FaUser style={profileTabStyle} /></Link></div> */}
        </div>
    )
}

export default FooterContainer;