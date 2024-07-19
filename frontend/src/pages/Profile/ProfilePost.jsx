import ProfilePostThumbnail from "./ProfilePostThumbnail";
import posts from "../../details/post";

function ProfilePost({post}) {
    const postList = posts;
    if (post.length === 0) return;
    
    function postThumbnail() {
        
        return post.map((postId) => {
            let post = postList.find((post) => post._id === postId);
            return <ProfilePostThumbnail post={post} key={post._id}/>
        })
    }

    return (
        <div className="profile-post-container">
            {postThumbnail()}
        </div>

    )
}


export default ProfilePost;