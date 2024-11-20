import { Link, useNavigate } from 'react-router-dom';

import { IoIosArrowDown } from "react-icons/io";
import { FaRegHeart, FaRegPlusSquare } from "react-icons/fa";
import { FavouritesPostsIcon, FollowingPostsIcon, StoryIcon } from '../../../../public/icons/HomePageIcon';
import { useState } from 'react';
import { PostGridIcon } from '../../../../public/icons/ProfilePageIcons';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useMediaContext } from '../../../context/MediaContext';


function SelectivePostDropDown() {

    const [ showSelection, setShowSelection ] = useState(false);

    useEffect(() => {
        if (showSelection) {
            document.addEventListener('touchend', handleOutsideClick );
            document.addEventListener('scroll', handleOutsideScroll);
        }
        return () => {
            document.removeEventListener('touchend', handleOutsideClick);
            document.removeEventListener('scroll', handleOutsideScroll);
        }
    }, [showSelection])


    function handleOutsideClick(event) {
        const element = event.target.closest('.parent');
        if (!element) {
            setShowSelection(false);
        }
    }

    function handleOutsideScroll() {
        setShowSelection(false);
    }

    return (
        <>
            <div className={`selection-container parent ${!showSelection ? 'display-none' : null}`}>

                <div className='selection-option WH-L'> 
                    <Link>
                        <span>Following</span>
                        <FollowingPostsIcon />
                    </Link>
                </div>

                <div className='selection-option WH-L'>
                    <Link>
                        <span>Favourites</span>
                        <FavouritesPostsIcon />
                    </Link>
                </div>

            </div>
            <div className="select-category-container parent">
                <div onClick={() => setShowSelection(!showSelection)} >
                    <IoIosArrowDown style={{color : 'white', width : '14px',}} />
                </div>
            </div>
        </>
    )
}

function CreateContainer () {

    const [ showSelection, setShowSelection ] = useState(false);
    const inputRef = useRef(null);
    const [ createMethod, setCreateMethod ] = useState(null);
    const { setMediaFile } = useMediaContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (showSelection) {
            document.addEventListener('touchend', handleOutsideClick);
            document.addEventListener('scroll', handleOutsideScroll);
        }

        return () => {
            document.removeEventListener('touchend', handleOutsideClick);
            document.removeEventListener('touchend', handleOutsideScroll);
        }
    }, [showSelection])

    function handleOutsideClick(event) {
        const element = event.target.closest('.parent');
        if (!element) {
            setShowSelection(false);
        }
    }

    function handleOutsideScroll() {
        setShowSelection(false);
    }

    function handleCreateLink(e, method) {
        e.preventDefault();
        setCreateMethod(method);
        inputRef.current.click();
    }

    function handleFileChange(e) {
        if (createMethod === 'post') return handleFileChangeForPost(e);
        else return handleFileChangeForStory(e);
    }

    function handleFileChangeForPost(e) {
        const media = e.target.files[0];
        if (!media) return;
        setMediaFile(media);
        navigate('/create/styles');
    }

    function handleFileChangeForStory(e) {
        const media = e.target.files[0];
        if (!media) return;
        setMediaFile(media);
        console.log("story",media);
        navigate('/create/story');
    }
    

    return (
        <>
            <div className={`selection-container parent ${!showSelection ? 'display-none' : null}`}>

                <input ref={inputRef} type='file' accept='image/*, video/*' onChange={handleFileChange} name='media' className='display-none' />
                <div className='selection-option WH-S'> 
                    <Link name='createPostLink' onClick={(e) => handleCreateLink(e, 'post')}>
                        <span>Post</span>
                        <PostGridIcon />
                    </Link>
                </div>

                <div className='selection-option WH-S'>
                    <Link onClick={(e) => handleCreateLink(e, 'story')}>
                        <span>Story</span>
                        <StoryIcon />
                    </Link>
                </div>

            </div>
            <div className="create-logo-container parent">
                <button className="default-button-style" onClick={() => setShowSelection(!showSelection)}>
                    <FaRegPlusSquare style={{color : "white", width : '24px', height : '25px', borderRadius : "9px"}} />
                </button>
            </div>
        </>
    )
}

function NotificationContainer() {
    return (
        <div className="notification-logo-container">
            <button className="default-button-style">
                <FaRegHeart style={{color : "white", width : '24px', height : '25px'}} />
            </button>
        </div>
    )
}

export { SelectivePostDropDown, CreateContainer, NotificationContainer };