import { ReelsIcon } from "../../../public/icons/FooterIcon";
import { SavePostIcon } from "../../../public/icons/Post";
import { FeedIcon, PostGridIcon, TaggedPostsIcon } from "../../../public/icons/ProfilePageIcons";

function ProfileTabList() {
    
    return (
        <div className="profile-tab-list border-frame">
            <div><PostGridIcon /></div>
            <div><FeedIcon /></div>
            <div><ReelsIcon /></div>
            <div><SavePostIcon /></div>
            <div><TaggedPostsIcon /></div>
        </div>
    )
}

export default ProfileTabList;