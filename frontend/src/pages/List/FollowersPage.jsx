
import SearchBar from "./SearchBar";
import '../../styles/List.css';
import IntroProfile from "./IntroProfile";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { ShowFollowingButton } from "./FollowingPage";

function FollowersPage() {

    const [ searchText, setSearchText ] = useState('');
    const [ followerList, setFollowerList ] = useState(null);
    const [ error, setError ] = useState('');
    const { requestUsername } = useParams();

    useEffect(() => {
        async function fetchUserFollowersList() {
            const response = await fetch(`http://localhost:3000/api/users/${requestUsername}/followers`);
            const userFollowers = await response.json();

            if (userFollowers.error) {
                setError(userFollowers.error);
                return;
            }

            setFollowerList(userFollowers);
        }

        fetchUserFollowersList();
    }, [ requestUsername ])

    function handleChange(e) {
        setSearchText(e.target.value);
    }

    function introProfile() {

        if (!followerList) return <h1>LOADING...</h1>;

        if ( followerList.length <= 0 ) return <h1>NO Followers yet</h1>;

        let list;
        if ( !searchText ) list = followerList;
        else {
            list = followerList.filter((follower) => follower.username.toLowerCase().startsWith(searchText.toLowerCase()));
        }

        if ( list.length <= 0 ) return <h1>No results found</h1>

        const intro = list.map((follower) => {
            const { _id, username, userFollowers, userFollowing, userProfilePic } = follower;
            
            return (
                <IntroProfile userProfile={{username, userFollowers, userProfilePic}} key={_id} > 
                    <div className="intro-profile-button-container">
                        <ShowButton username={username} userFollowers={userFollowers} userFollowing={userFollowing} requestUsername={requestUsername} />
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

export default FollowersPage;

function ShowButton({ username, userFollowers, requestUsername}) {

    const [ isRemoved, setIsRemoved ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const { authUser } = useAuthContext();
    const sameUser = authUser.username === requestUsername;

    async function handleRemove() {

        setLoading(true);
        
        const response = await fetch('http://localhost:3000/api/users/operations/remove', {
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