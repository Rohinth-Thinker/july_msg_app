import ProfilePostThumbnail from "./ProfilePostThumbnail";
import postss from "../../details/post";
import { useEffect } from "react";
import { useState } from "react";
import fetchPost from "../../components/fetchPost";
import readPost from "../../components/readPost";

function ProfilePost({post, postIds}) {
    const [ postList, setPostList ] = useState([]);
    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        async function fetchPostAndRead() {
            setLoading(true);

            const postDetails = await Promise.all( postIds.map(async (id) => await fetchPost(id)));

            const posts = await Promise.all( postDetails.map(async (post) => {
                return { ...post, postSrc : await readPost(post.postFileId) };
            }) )

            setLoading(false);

            setPostList(posts);
        }

        if (postIds.length > 0) fetchPostAndRead();
    }, [postIds])

    function postThumbnail() {
        const thumbnails = postList.map((post) => {
            return <ProfilePostThumbnail postId={post._id} postSrc={post.postSrc} key={post._id} />
        })

        return thumbnails;
    }

    if (loading) return <div> <h1>LOADING...</h1> </div>;
    if (postList.length === 0) return <h1>No post Yet</h1>;

    return (
        <div className="profile-post-container">
            {postThumbnail()}
        </div>

    )
}


export default ProfilePost;