import { useState } from "react";
import Comment from "./Comment";

function CreateComment({ comment, setIsReplying }) {
    const [ commentList, setCommentList ] = useState([ comment ]);
    const [ replies, setReplies ] = useState(null);

    async function handleViewReplies(id) {
        if (commentList.length === 1) {
            if (!replies) {
                console.log("FETCHING...")
                const response = await fetch(`/api/post/get/comments/replies/${id}`);
                const result = await response.json()
                if (!response.ok) return;

                setCommentList((p) => [ ...p, ...result.replies ]);
            } else {
                console.log("Take from Replies");
                setCommentList((p) => [ ...p, ...replies ]);
            }

        } else {
            console.log("UNHIDE");
            const [ comment, ...repliedComment ] = commentList;
            setReplies(repliedComment);
            setCommentList([comment]);
        }
    }

    function showComment() {
        return commentList.map((comment) => <Comment comment={comment} setIsReplying={setIsReplying} 
                handleViewReplies={handleViewReplies} showViewButton={commentList.length === 1} key={comment._id} />);
    }

    return (
        <>
            { showComment() }
        </>
    )
}

export default CreateComment;