import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ClickedPostOptionContainer, CommentPostContainer, LikePostContainer, PostCaptionContainer, PostCommentsCountContainer, PostImageContainer, PostLikesCountContainer, PostOptionContainer, PostTimeContainer, SavePostContainer, SendPostContainer }
 from "./components/PostComponents";


function Post() {

    const [ showOptionList, setShowOptionList ] = useState(false);

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
                        <Link className="post-header-account-name">marvelworld.in</Link>
                    </div>
                </div>

                <ClickedPostOptionContainer showOptionList={showOptionList} />
                <div className="post-header-right-side">
                    <PostOptionContainer handleOptionClick={handleOptionClick} />
                </div>

            </div>

           <PostImageContainer />
           
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

           <PostLikesCountContainer />

            <PostCaptionContainer />
            
           <PostCommentsCountContainer />
           
           <PostTimeContainer />
        </div>
    )
}

export default Post;