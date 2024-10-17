
import SearchBar from "./SearchBar";
import '../../styles/List.css';
import IntroProfile from "./IntroProfile";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { ShowFollowingButton } from "./FollowingPage";
import useFetchUsersByPage from "../../hooks/useFetchUsersByPage";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import LoadingIndicator from "../../comp/LoadingIndicator";

function FollowersPage() {
    
    const { requestUsername } = useParams();
    const fetchUrl = `/api/users/${requestUsername}/followers`;

    const [ searchText, setSearchText ] = useState('');
    const [ page, setPage ] = useState(1);
    const [ list, loading, hasMore ] = useFetchUsersByPage(searchText, page, setPageNumber, fetchUrl);
    const lastElementRef = useRef();
    useIntersectionObserver([list], lastElementRef, incrementPage, 0.5);

    function setPageNumber(number) {
        setPage(number);
    }

    function incrementPage() {
        if (hasMore) {
            console.log('clicked');
            setPage(page + 1);
        }
    }

    function handleChange(e) {
        setSearchText(e.target.value);
    }

    function introProfile() {

        if(!list) return null;

        if ( list.length <= 0 ) return <h1>No results found</h1>

        const intro = list.map((follower, index) => {
            const { _id, username, userFollowers, userFollowing, userProfilePic } = follower;
            
            return (
                <div ref={ (list.length === index + 1) ? lastElementRef : null } key={_id}>
                    <IntroProfile userProfile={{username, userFollowers, userProfilePic}} > 
                        <div className="intro-profile-button-container">
                            <ShowButton username={username} userFollowers={userFollowers} userFollowing={userFollowing} requestUsername={requestUsername} />
                        </div> 
                    </IntroProfile>
                </div>
            )
        })

        return intro;
    }


    return (
        <div className="followers-container mTop-45">
            <div className="pBottom-100">
                <SearchBar searchText={searchText} handleChange={handleChange} />
                { introProfile() }
                { loading && <LoadingIndicator /> }
            </div>
        </div>
    )
}

export default FollowersPage;

function ShowButton({ username, userFollowers, requestUsername}) {

    const [ isRemoved, setIsRemoved ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const { authUser } = useAuthContext();
    const sameUser = authUser.username === requestUsername;

    async function handleRemove() {

        setLoading(true);
        
        const response = await fetch('/api/users/operations/remove', {
            method : "PATCH",
            body : JSON.stringify({ username, }),
            headers : {
                "Content-Type" : "application/json",
            }
        })

        setLoading(false);
        if(response.ok) {
            setIsRemoved(true);
        }     
    }

    if (!sameUser) {
        return <ShowFollowingButton username={username} userFollowers={userFollowers} />;
    }



    if (!isRemoved) {
        return (
            <button onClick={handleRemove} className="bg-color-gray">
                { loading ? 'Loading...' : 'Remove' }
            </button>
        )
    } else {
        return (
            <button className="bg-color-gray-disabled" disabled>
                Removed
            </button>
        )
    }
}