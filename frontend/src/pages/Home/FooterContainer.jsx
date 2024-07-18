
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { HomeIcon, MessengerIcon, ReelsIcon, SearchIcon } from "../../../public/icons/FooterIcon";


function FooterContainer({tab}) {
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
            <div className="footer-icon-container"><a><SearchIcon /></a></div>
            <div className="footer-icon-container"> <a> <ReelsIcon /> </a> </div>
            <div className="footer-icon-container"> <a> <MessengerIcon /> </a> </div>
            <div className="footer-icon-container"><Link to={"/profile"}><FaUser style={profileTabStyle} /></Link></div>
        </div>
    )
}

export default FooterContainer;