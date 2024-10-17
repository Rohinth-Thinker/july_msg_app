import { useEffect, useState } from "react";
import readPost from "../components/readPost";

function useFetchPostsByPage( page, limit ) {
    const [ loading, setLoading ] = useState(false);
    const [ hasMore, setHasMore ] = useState(true);
    const [ posts, setPosts ] = useState([]);

    useEffect(() => {
        let ignore = false;

        async function fetchAndReadPosts() {
            try {
                setLoading(true);

                const response = await fetch(`/api/post/posts/fetch?page=${page}&limit=${limit}`);
                const results = await response.json()

                const postList = results.results;
                const p = await Promise.all( postList.map(async (post) => {
                    const postSrc = await readPost(post.postFileId);
                    return { ...post, postSrc };
                }))

                const allPosts = [ ...posts, ...p ];

                if (!ignore) {
                    if (allPosts.length === results.totalPost) {
                        setHasMore(false);
                    }
                    setLoading(false);
                    setPosts(allPosts);
                }
                
            } catch(err) {
                console.log(`${err.name} : ${err.message}`);
                setLoading(false);
            }
        }

        if (hasMore) fetchAndReadPosts();  
        
        return () => {
            ignore = true;
        }

    }, [ page ] )

    return [ loading, hasMore, posts ]
}

export default useFetchPostsByPage;