
function ProfileStatus({ userStatus }) {

    const { post, followers, following } = userStatus;

    return (
        <div className="profile-status-container border-bottom" >
            <div className="count-container"><span>{ post.length }</span><span>posts</span></div>
            <div className="count-container"><span> { followers.length } </span><span>followers</span></div>
            <div className="count-container"><span> {following.length} </span><span>following</span></div>
        </div>
    )
}

export default ProfileStatus;