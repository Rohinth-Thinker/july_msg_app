import ProfilePostThumbnail from "./components/ProfilePostThumbnail";
import useFetchAndReadPosts from "../../hooks/useFetchAndReadPosts";
import LoadingIndicator from "../../comp/LoadingIndicator";

function ProfilePost({postIds}) {
    const [ loading, postList ] = useFetchAndReadPosts(postIds);

    if (loading) return <LoadingIndicator />;
    if (postList.length === 0) return <h1>No post Yet</h1>;

    return (
        <div className="profile-post-container">
            {postThumbnail(postList)}
        </div>

    )
}

export default ProfilePost;

function postThumbnail(postList) {
    const thumbnails = postList.map((post) => {
        return <ProfilePostThumbnail postId={post._id} postSrc={post.postSrc} key={post._id} />
    })

    return thumbnails;
}
