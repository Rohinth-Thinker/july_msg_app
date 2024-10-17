import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import Post from "../../comp/Post/Post";
import useFetchPostsByPage from "../../hooks/useFetchPostsByPage";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import LoadingIndicator from "../../comp/LoadingIndicator";


function MainContainer() {
    const [ page, setPage ] = useState(1);
    const [ loading, hasMore, posts ] = useFetchPostsByPage(page, 3);
    const lastElementRef = useRef();
    useIntersectionObserver([posts], lastElementRef, incrementPage, 0);

    function incrementPage() {
        if (hasMore) {
            setPage(page + 1);
        }
    }

    return (
        <div className="home-body-container">
            { showPosts(posts, lastElementRef) }
            { loading && <LoadingIndicator /> }
        </div>
    )
}

export default MainContainer;


function showPosts(posts, lastElementRef) {
    return posts.map((post, index) => {
        const isLast = posts.length === index + 2;
        return <Post postProps={post} key={post._id} ref={isLast ? lastElementRef : null} />;
    })
}
