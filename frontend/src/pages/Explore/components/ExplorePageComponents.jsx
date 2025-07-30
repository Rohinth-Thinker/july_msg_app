import { useEffect, useRef, useState } from "react";
import LoadingIndicator from "../../../comp/LoadingIndicator";
import useFetchPostsByPage from "../../../hooks/useFetchPostsByPage";
import useFetchUsersByPage from "../../../hooks/useFetchUsersByPage";
import useIntersectionObserver from "../../../hooks/useIntersectionObserver";
import { ShowFollowingButton } from "../../List/FollowingPage";
import IntroProfile from "../../List/IntroProfile";
import ProfilePostThumbnail from "../../Profile/components/ProfilePostThumbnail";

function ExploreProfilesContainer({ searchText }) {
    
    const fetchUrl = `/api/users`;
    const [ page, setPage ] = useState(0);
    const [ list, loading, hasMore ] = useFetchUsersByPage(searchText, page, setPageNumber, fetchUrl);
    const lastElementRef = useRef();
    useIntersectionObserver([list], lastElementRef, incrementPage, 1);

    function setPageNumber(number) {
        setPage(number);
    }

    function incrementPage() {
        if (hasMore) {
            setPage(page + 1);
        }
    }

    function introProfile() {
        if ( !searchText || !list ) return null;
        if ( list.length <= 0 ) return <h1>No results found</h1>

        const intro = list.map((userProfile, index) => {                
            const { _id, username,  userProfilePic, userFollowers } = userProfile;
            
            return (
                <div ref={ (list.length === index + 1) ? lastElementRef : null } key={_id}>
                    <IntroProfile userProfile={{username, userFollowers, userProfilePic}} > 

                            <div className='intro-profile-button-container'>
                                <ShowFollowingButton username={username} userFollowers={userFollowers} />
                            </div>
                                
                    </IntroProfile>
                </div>
            )
        })

        return intro;
    }

    return (
        <div >
                { introProfile() }
                { loading && <LoadingIndicator /> }
        </div>
    )
}

function ExplorePostsContainer() {
    const lastElementRef = useRef();
    const [ page, setPage ] = useState(1);
    const [ loading, hasMore, posts ] = useFetchPostsByPage(page, 3);
    useIntersectionObserver([posts], lastElementRef, incrementPage, 0);

    function incrementPage() {
        if (hasMore) {
            setPage(prev => prev + 1);
        }
    }

    return (
        <>
            {
                posts.map((post, index) => {
                    let isLast = posts.length === index + 1;
                    return <ProfilePostThumbnail ref={isLast ? lastElementRef : null}
                                postId={post._id} postSrc={post.postSrc} fileType={post.fileType} key={post._id} />
                })
            }

            { loading && <LoadingIndicator /> }
        </>
    )
}


export { ExploreProfilesContainer, ExplorePostsContainer }