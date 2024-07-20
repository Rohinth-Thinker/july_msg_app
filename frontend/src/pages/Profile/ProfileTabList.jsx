import { ReelsIcon } from "../../../public/icons/FooterIcon";
import { SavePostIcon } from "../../../public/icons/Post";
import { FeedIcon, PostGridIcon, TaggedPostsIcon } from "../../../public/icons/ProfilePageIcons";
import { useAuthContext } from "../../context/AuthContext";

function ProfileTabList({ username }) {

    const { authUser } = useAuthContext();
    
    return (
        <div className="profile-tab-list border-bottom">
            <div><PostGridIcon /></div>
            <div><FeedIcon /></div>
            <div><ReelsIcon /></div>
            { ( authUser.username === username ) ? <div><SavePostIcon /></div> : ''}   
            <div><TaggedPostsIcon /></div>
        </div>
    )
}

export default ProfileTabList;