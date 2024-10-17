
import SearchBar from "./SearchBar";
import '../../styles/List.css';
import IntroProfile from "./IntroProfile";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import useFetchUsersByPage from "../../hooks/useFetchUsersByPage";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import { useRef } from "react";
import LoadingIndicator from "../../comp/LoadingIndicator";

function FollowingPage() {
    const { requestUsername } = useParams();
    const fetchUrl = `/api/users/${requestUsername}/following`;

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

        if (!list) return null;

        if ( list.length <= 0 ) return <h1>No results found</h1>

        const intro = list.map((followingUser, index) => {
            const { _id, username, userFollowers, userProfilePic } = followingUser;

            return (
                <div ref={ (list.length === index + 1) ? lastElementRef : null } key={_id}>
                    <IntroProfile userProfile={{username, userFollowers, userProfilePic}} > 
                        <div className="intro-profile-button-container">
                            <ShowFollowingButton username={username} userFollowers={userFollowers} />
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

function ShowFollowingButton({ username, userFollowers }) {

    const { authUser } = useAuthContext();
    const [ isFollowing, setIsFollowing ] = useState(userFollowers.includes(authUser.username));
    const [ loading, setLoading ] = useState(false);

    // let followers = userFollowers;

    async function handleUnfollow() {
        // followers = followers.filter((name) => name !== authUser.username);
        setLoading(true);

        const response = await fetch('/api/users/operations/unfollow', {
            method : "PATCH",
            body : JSON.stringify({ username, }),
            headers : {
                "Content-Type" : "application/json",
            }
        })

        setLoading(false);
        if(response.ok) {
            setIsFollowing(false);
        }        
    }

    async function handleFollow() {
        // followers.push(authUser.username);
        setLoading(true);

        const response = await fetch('/api/users/operations/follow', {
            method : "PATCH",
            body : JSON.stringify({ username, }),
            headers : {
                "Content-Type" : "application/json",
            }
        })

        setLoading(false);
        if(response.ok) {
            setIsFollowing(true);
        }
    }

    if (authUser.username === username) return;

    if (isFollowing) {
        return (
            <button onClick={handleUnfollow} className="bg-color-gray">
                    {loading ? 'Loading...' : 'Following'}
            </button>
        )
    } else {
        return (
            <button onClick={handleFollow} className="bg-color-blue">
                {loading ? 'Loading...' : 'Follow'}
            </button>
        )
    }
}

export  { FollowingPage, ShowFollowingButton };