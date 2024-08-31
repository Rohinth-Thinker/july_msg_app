import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import Post from "../../comp/Post/Post";


function MainContainer() {
    const [ posts, setPosts ] = useState([]);
    const [ page, setPage ] = useState(1);
    // const [ loading, setLoading ] = useState(false);
    const lastElementRef = useRef();

    useEffect(() => {
        async function fetchPosts() {
            const response = await fetch(`http://localhost:3000/api/post/posts/fetch?page=${page}&limit=3`);
            const results = await response.json()
            
            setPosts([...posts, ...results.results]);
        }

        fetchPosts()
    }, [ page ] )

    useEffect(() => {
        console.log(lastElementRef.current);
        if (!lastElementRef.current) return;

        const observer = new IntersectionObserver((entries) => {
            console.log(entries[0])
            console.log(entries[0].isIntersecting);
            if (entries[0].isIntersecting) {
                incrementPage();
            }
        }, { threshold : 1 })

        observer.observe(lastElementRef.current);

        return () => {
            if (lastElementRef.current) {
                observer.disconnect();
            }
        }
    }, [ posts ])

    function incrementPage() {
        setPage(page + 1);
    }


    function showPosts() {
        return posts.map((post, index) => {
            const isLast = posts.length === index + 1;
            if ( isLast ) {
                return <Post p={post} key={post._id} ref={lastElementRef} />
            }

            return <Post p={post} key={post._id}/>
        })
    }


    return (
        <div className="home-body-container">
            {/* { console.log(lastElementRef) } */}
            { showPosts() }
        </div>
    )
}

export default MainContainer;