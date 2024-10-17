import { useEffect, useState } from "react";
import fetchPost from "../components/fetchPost";
import readPost from "../components/readPost";

function useFetchAndReadPosts( postIds ) {
    const [ postList, setPostList ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState('');

    useEffect(() => {
        async function fetchAndReadPosts() {
            try {
                setLoading(true);

                const postDetails = await Promise.all( postIds.map(async (id) => await fetchPost(id)));
                if (postDetails[0] === null) {
                    setError('Invalid Url');
                    setLoading(false)
                    return;
                }

                const posts = await Promise.all( postDetails.map(async (post) => {
                    return { ...post, postSrc : await readPost(post.postFileId) };
                }) )

                setLoading(false);

                setPostList(posts);

            } catch(err) {
                console.log(`${err.name} : ${err.message}`);
                setLoading(false);
            }
        }

        if (postIds.length > 0) fetchAndReadPosts();
    }, [...postIds])

    return [ loading, postList, error ];
}

export default useFetchAndReadPosts;