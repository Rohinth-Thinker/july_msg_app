import { FaUser } from "react-icons/fa";
import { CommentLikeIcon } from "../../../../public/icons/Post";
import { PostCaptionContainer } from "../../../pages/Home/components/PostComponents";

function Comment({ comment, setIsReplying, handleViewReplies, showViewButton }) {
    const isReply = comment.parentId;

    function handleReplyClick() {
        setIsReplying({ commentId : comment._id, username : comment.username });
    }
    
    return (
        <div>
            <div className={`comment ${isReply ? 'replied-comment' : ''}`}>
                <div className="left-section">
                    <div className="story-pic-border">
                        <div className="story-profile-pic-container WH-38">
                            <FaUser style={{color:"white", width:'72%', height:'72%'}} />
                        </div>
                    </div>
                </div>
                
                <div className="middle-section">
                    <PostCaptionContainer username={comment.username} caption={comment.text} />
                    <div className="comment-details">
                        <div className="comment-time-container"><span>1 d</span></div>
                        <div className="comment-likes-count-container"><span>29 likes</span></div>
                        <div className="reply-option-container"
                            onClick={handleReplyClick}><span>Reply</span></div>
                    </div>
                </div>

                <div className="right-section">
                    <CommentLikeIcon />
                </div>

            </div>
            
            { ( !isReply && comment.replies.length > 0 ) &&
                <div onClick={() => handleViewReplies(comment._id)} className="text-view-replies-container"><span>
                    { showViewButton ? `-- View all ${comment.replies.length} replies` : '-- Hide all replies' }
                </span></div>
            }
        </div>
    )
}

export default Comment;