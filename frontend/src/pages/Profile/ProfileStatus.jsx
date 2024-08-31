import { Link } from "react-router-dom";

function ProfileStatus({ userStatus }) {

    const { username, userPost, userFollowers, userFollowing } = userStatus;

    return (
        <div className="profile-status-container border-bottom" >
            <div className="count-container"><span>{ userPost.length }</span><span>posts</span></div>
            <Link to={`/${username}/followers`} ><div className="count-container"><span> { userFollowers.length } </span><span>followers</span></div></Link>
            <Link to={`/${username}/following`}><div className="count-container"><span>{userFollowing.length} </span><span>following</span></div></Link>
        </div>
    )
}

export default ProfileStatus;