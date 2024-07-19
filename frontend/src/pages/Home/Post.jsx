import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { ClickedPostOptionContainer, CommentPostContainer, LikePostContainer, PostCaptionContainer, PostCommentsCountContainer, PostImageContainer, PostLikesCountContainer, PostOptionContainer, PostTimeContainer, SavePostContainer, SendPostContainer }
 from "./components/PostComponents";
 import posts from "../../details/post";
import userProfiles from "../../details/userProfile";


function Post() {

    const [ showOptionList, setShowOptionList ] = useState(false);

    const { postId } = useParams();
    
    const post = posts.find((post) => post._id === postId);
    if (!post) return <h1>Wrong Post Id</h1>
    const userProfile = userProfiles.find((user) => user.post.includes(postId));
    console.log(post);


    function handleOptionClick() {
        setShowOptionList(!showOptionList);
    }

    return (
        <div className="post-main-container">

            <div className="post-header-container">
                <div className="post-header-left-side">
                    <div className="story-pic-border">
                        <div className="story-profile-pic-container WH-38">
                            <FaUser style={{color:"white", width:'72%', height:'72%'}} />
                        </div>
                    </div>
                    <div className="post-header-acoount-name-container">
                        <Link className="post-header-account-name"> { userProfile.username } </Link>
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

           <PostLikesCountContainer likes={post.likes} />

            <PostCaptionContainer caption={post.caption} />
            
           <PostCommentsCountContainer comments={post.comments} />
           
           <PostTimeContainer createdAt={post.createdAt} />
        </div>
    )
}

export default Post;