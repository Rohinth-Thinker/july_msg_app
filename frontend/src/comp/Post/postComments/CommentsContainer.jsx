import { useState } from "react";
import { useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { CommentWrongIcon } from "../../../../public/icons/Post";
import { PostCaptionContainer } from "../../../pages/Home/components/PostComponents";
import '../../../styles/CommentsContainer.css';
import Comment from "./Comment";
import { CommentsInputContainer } from "./CommentsContainerComponents";
import CreateComment from "./CreateComment";

function CommentsContainer() {
    const { postId } = useParams();
    const [ commentList, setCommentList ] = useState(null);
    const [ isReplying, setIsReplying ] = useState(null);
    const [ post, setPost ] = useState(null);

    useEffect(() => {
        async function fetchPostComments() {
            const response = await fetch(`/api/post/${postId}/comments/all`);
            const result = await response.json();
            if (!response.ok) {
                return;
            }

            setPost(result.post);
            setCommentList(result.comments);
        }

        if (postId) fetchPostComments();
    }, [ postId ])

    async function handleClick(commentText) {
        if (!commentText) return;

        const response = await fetch('/api/post/comments/add', {
            method : "POST",
            body : JSON.stringify({ postId, commentText, parentId : isReplying?.commentId }),
            headers : {
                "Content-Type" : "application/json",
            },
        })

        const result = await response.json();

        if (!response.ok) {
            console.log(result.error);
            return;
        }

        console.log(result.newComment);
    }

    function handleIsReplying(v) {
        setIsReplying(v);
    }

    function showComments() {
        return commentList.map((comment) => <CreateComment comment={comment} setIsReplying={handleIsReplying} key={comment._id}/>)
    }

    if (!commentList) return null;

    return (
        <div className="comments-container mTop-45 ">
            <div className="comments-caption-container border-bottom pBottom">

                <div className="left-section">
                    <div className="story-pic-border">
                        <div className="story-profile-pic-container WH-38">
                            <FaUser style={{color:"white", width:'72%', height:'72%'}} />
                        </div>
                    </div>
                </div>
                <div className="right-section">
                    <PostCaptionContainer username={post.username} caption={post.postCaption} />
                </div>
            </div>

            <div className="comments">
                {/* <Comment isReply={false} />
                <Comment isReply={true} />
                <Comment isReply={true} />
                <Comment isReply={false} />
                <Comment isReply={false} /> */}
                { showComments() }

            </div>

            { isReplying && 
                <div className="replying-status-container border-top">
                    <div>
                        <span>Replying to {isReplying.username}</span>
                        <div onClick={() => handleIsReplying(null)}><CommentWrongIcon /></div>
                    </div>
                </div>
            }

            <div className="comments-input-main-container">
                <CommentsInputContainer submit={handleClick} />
            </div>
        </div>
    )
}

export default CommentsContainer;