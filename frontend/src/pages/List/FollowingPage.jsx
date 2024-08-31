
import SearchBar from "./SearchBar";
import '../../styles/List.css';
import IntroProfile from "./IntroProfile";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

function FollowingPage() {

    const [ searchText, setSearchText ] = useState('');
    const [ followingList, setFollowingList ] = useState(null);
    const [ error, setError ] = useState('');
    const { requestUsername } = useParams();

    useEffect(() => {
        async function fetchUserFollowingList() {
            const response = await fetch(`http://localhost:3000/api/users/${requestUsername}/following`);
            const userFollowing = await response.json();

            if (userFollowing.error) {
                setError(userFollowing.error);
                return;
            }

            setFollowingList(userFollowing);
        }

        fetchUserFollowingList();
    }, [ requestUsername ])

    function handleChange(e) {
        setSearchText(e.target.value);
    }

    function introProfile() {

        if (!followingList) return <h1>LOADING...</h1>;

        if ( followingList.length <= 0 ) return <h1>NO Followers yet</h1>;

        let list;
        if ( !searchText ) list = followingList;
        else {
            list = followingList.filter((follower) => follower.username.toLowerCase().startsWith(searchText.toLowerCase()));
        }

        if ( list.length <= 0 ) return <h1>No results found</h1>

        const intro = list.map((followingUser) => {
            const { _id, username, userFollowers, userProfilePic } = followingUser;

            return (
                <IntroProfile userProfile={{username, userFollowers, userProfilePic}} key={_id} > 
                    <div className="intro-profile-button-container">
                        <ShowFollowingButton username={username} userFollowers={userFollowers} />
                    </div> 
                </IntroProfile>
            )
        })

        return intro;
    }

    if (error) return <h1 className="mTop-45"> { error } </h1>;

    return (
        <div className="followers-container mTop-45">
            <SearchBar searchText={searchText} handleChange={handleChange} />
              
            { introProfile() }
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

        const response = await fetch('http://localhost:3000/api/users/operations/unfollow', {
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

        const response = await fetch('http://localhost:3000/api/users/operations/follow', {
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