import { forwardRef, useState } from "react";
import { FaUser } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { ClickedPostOptionContainer, CommentPostContainer, LikePostContainer, PostCaptionContainer, PostCommentsCountContainer, PostImageContainer, PostLikesCountContainer, PostOptionContainer, PostTimeContainer, SavePostContainer, SendPostContainer }
 from "../../pages/Home/components/PostComponents";
import { useEffect } from "react";
import fetchPost from "../../components/fetchPost";
import readPost from "../../components/readPost";


function Post({ p}, ref) {

    const [ showOptionList, setShowOptionList ] = useState(false);
    const [ post, setPost ] = useState(p)
    // const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        async function fetchPostAndRead() {
            // setLoading(true);
            
            // const postDetails = await fetchPost(postId);
            // if (!postDetails) {
            //     setLoading(false);
            //     return;
            // }

            const postSrc = await readPost(post.postFileId);
            // console.log(postSrc);

            // setLoading(false);

            setPost({ ...post, postSrc });
        }

        fetchPostAndRead()
    }, [p])
    
    // if (loading) return <div> <h1>LOADING...</h1> </div>
    if (!post) return <div> <h1>Invalid URL</h1> </div>

    function handleOptionClick() {
        setShowOptionList(!showOptionList);
    }

    return (
            <div ref={ref} className="post-main-container" >

                <div className="post-header-container">
                    <div className="post-header-left-side">
                        <div className="story-pic-border">
                            <div className="story-profile-pic-container WH-38">
                                <FaUser style={{color:"white", width:'72%', height:'72%'}} />
                            </div>
                        </div>
                        <div className="post-header-acoount-name-container">
                            <Link className="post-header-account-name"> { post.username } </Link>
                        </div>
                    </div>

                    <ClickedPostOptionContainer showOptionList={showOptionList} />
                    <div className="post-header-right-side">
                        <PostOptionContainer handleOptionClick={handleOptionClick} />
                    </div>

                </div>

            <PostImageContainer src={post.postSrc} />
            
                <div className="post-operations-container HORI-PAD-16">
                    <div className="post-operations-left-side">
                        <LikePostContainer />
                        <CommentPostContainer />
                        <SendPostContainer />
                    </div>
                    <div className="post-operations-right-side">
                        <SavePostContainer />
                    </div>
                </div>

            <PostLikesCountContainer likes={post.postLikes} />

                <PostCaptionContainer username={post.username} caption={post.postCaption} />
                
            <PostCommentsCountContainer comments={post.postComments} />
            
            <PostTimeContainer createdAt={post.createdAt} />
            </div>
    )
}

export default forwardRef(Post);