import { useEffect } from "react";
import { forwardRef, useState } from "react";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { ClickedPostOptionContainer, CommentPostContainer, LikePostContainer, PostCaptionContainer, PostCommentsCountContainer, PostImageContainer, PostLikesCountContainer, PostOptionContainer, PostTimeContainer, SavePostContainer, SendPostContainer }
 from "../../pages/Home/components/PostComponents";


function Post({ postProps }, ref) {

    const [ showOptionList, setShowOptionList ] = useState(false);
    const [ post, setPost ] = useState(postProps || null);
    const { authUser } = useAuthContext();

    async function handleLikes() {
        let postLikes = post.postLikes;
        let isLike;
        if (postLikes.includes(authUser.username)) {
            postLikes = postLikes.filter((username) => username !== authUser.username);
            isLike = false;
        } else {
            postLikes.push(authUser.username)
            isLike = true;
        }
        
        const response = await fetch('/api/post/handle/interactions/like', {
            method : "PATCH",
            body : JSON.stringify({ postId : post._id, isLike }),
            headers : {
                "Content-Type" : "application/json",
            }
        })
        
        setPost({...post, postLikes});
    }
    
    if (!post) return;

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
                        <LikePostContainer isSelected={post.postLikes.includes(authUser.username)} 
                            handleLikes={handleLikes} />
                        <CommentPostContainer postId={post._id} />
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