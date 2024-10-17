import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import useFetchPostsByPage from '../../hooks/useFetchPostsByPage';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import '../../styles/Explore.css';
import { ShowFollowingButton } from '../List/FollowingPage';
import IntroProfile from '../List/IntroProfile';
import ProfilePostThumbnail from '../Profile/components/ProfilePostThumbnail';
import { ExplorePostsContainer, ExploreProfilesContainer } from './components/ExplorePageComponents';

function ExplorePage() {

    const [ showSearchContainer, setShowSearchContainer ] = useState(false);
    const [ searchText, setSearchText ] = useState('');

    function handleSearchChange(e) {
        setSearchText(e.target.value);
    }

    function handleFocus() {
        setShowSearchContainer(true);
    }

    function handleCancelClick() {
        setShowSearchContainer(false);
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

            { showSearchContainer ?
                <div className={` pBottom-100 ${showSearchContainer ? '' : 'display-none'}`}>  
                    <ExploreProfilesContainer searchText={searchText} />
                </div>
                    :
                <div className={`explore-posts-container profile-post-container ${!showSearchContainer ? '' : 'display-none' }`}>
                    <ExplorePostsContainer />
                </div>
            }

           
        </div>
    )
}

export default ExplorePage;