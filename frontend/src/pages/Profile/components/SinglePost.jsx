import { useParams } from "react-router-dom";
import LoadingIndicator from "../../../comp/LoadingIndicator";
import Post from "../../../comp/Post/Post";
import useFetchAndReadPosts from "../../../hooks/useFetchAndReadPosts";

function SinglePost() {

    const { postId } = useParams();
    const [ loading, postList, error ] = useFetchAndReadPosts([postId]);

    return (
        <div className="mTop-45">
            {
                error ? <h1>{error}</h1> : 
                    loading ? <LoadingIndicator /> : <Post postProps={postList[0]} />
            }
        </div>
    )
}


export default SinglePost;