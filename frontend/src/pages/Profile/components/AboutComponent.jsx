import { FaUser } from "react-icons/fa";



function UserProfilePic({ pic }) {
    if (!pic) {
        return <FaUser style={{color:"white", width:'72%', height:'72%'}} />;
    }

    return <img src={`/profile-pic/${pic}`} style={{width: "100%", height: "100%", borderRadius: '50%'}} />
}

export { UserProfilePic }