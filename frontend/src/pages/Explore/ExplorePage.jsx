import { useEffect } from 'react';
import { useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import posts from '../../details/post';
import userProfiles from '../../details/userProfile';
import '../../styles/Explore.css';
import { ShowFollowingButton } from '../List/FollowingPage';
import IntroProfile from '../List/IntroProfile';
import ProfilePostThumbnail from '../Profile/ProfilePostThumbnail';

function ExplorePage() {

    const [ showSearchContainer, setShowSearchContainer ] = useState(false);
    const [ searchText, setSearchText ] = useState('');
    const [ list, setList ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const { authUser } = useAuthContext();

    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            async function fetchFilteredUser() {

                setLoading(true);

                const response = await fetch(`http://localhost:3000/api/users?search=${searchText}`);
                const filteredUser = await response.json();
    
                if (filteredUser.length > 0) {
                    setList(filteredUser);
                } else {
                    setList([]);
                }

                setLoading(false);
            }
    
            if (searchText) fetchFilteredUser();
        }, 300)
        
        return () => clearTimeout(debounceTimeout);

    }, [ searchText ])

    function handleSearchChange(e) {
        setSearchText(e.target.value);
    }

    function handleFocus() {
        setShowSearchContainer(true);
    }

    function handleCancelClick() {
        setShowSearchContainer(false);
    }

    function introProfile() {
        if ( !searchText ) return;
        if (loading) return <h1>Loading...</h1>;
        if ( list.length <= 0 ) return <h1>No results found</h1>

        const intro = list.map((userProfile) => {
            const { _id, username,  userProfilePic, userFollowers } = userProfile;
            
            return (
                <IntroProfile userProfile={{username, userFollowers, userProfilePic}} key={_id} > 

                        <div className='intro-profile-button-container'>
                            <ShowFollowingButton username={username} userFollowers={userFollowers} />
                        </div>
                            
                </IntroProfile>
            )
        })

        return intro;
    }

    return (
        
        <div className="explore-main-container">
            <div className="explore-search-container border-bottom">
                <input className="explore-search-bar" onFocus={handleFocus} value={searchText}
                        onChange={handleSearchChange} type='search' placeholder="Search" />

                <div className={`cancel-button-container ${ showSearchContainer ? '' : 'display-none' }`} >
                    <button className='cancel-button' onClick={handleCancelClick}>Cancel</button>
                </div>
            </div>

            <div className={`explore-posts-container profile-post-container ${!showSearchContainer ? '' : 'display-none' }`}>
                {
                    posts.map((post) => <ProfilePostThumbnail post={post} key={post._id} />)
                }
            </div>

            <div className={`${showSearchContainer ? '' : 'display-none'}`}>
                { introProfile() }
            </div>
        </div>
    )
}

export default ExplorePage;