import { useParams } from "react-router-dom";
import Post from "../../../comp/Post/Post";

function SinglePost() {

    const { postId } = useParams();

    return (
        <div className="mTop-45">
            <Post postId={postId} />
        </div>
    )
}


export default SinglePost;