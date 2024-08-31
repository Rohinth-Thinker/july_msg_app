import { CommentPostIcon, LikePostIcon, OptionIcon, SavePostIcon, SendPostIcon } from "../../../../public/icons/Post";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { BackButtonIcon } from "../../../../public/icons/ProfilePageIcons";

function Header({ header }) {

    const navigate = useNavigate();

    function navigateToPreviousPage() {
        navigate(-1);
    }

    return (
        <div className="profile-header border-bottom">
            <div className="profile-header-left-section" onClick={navigateToPreviousPage} >
                <BackButtonIcon />
            </div>
            <div className="profile-header-middle-section">
                <span className="font-size-17"> {header} </span>
            </div>
            <div className="profile-header-right-section"></div>
        </div>
    )
}

function PostOptionContainer({handleOptionClick}) {

    return (
        <>
            <div onClick={handleOptionClick} >
                <OptionIcon />
            </div>
        </>
    )
}

function ClickedPostOptionContainer({showOptionList}) {

    return (
        <div className={`clicked-post-option-container  ${(!showOptionList) ? 'display-none' : null}`}>
            <div><button className="first-button"><span className="text-color-red">Report</span></button></div>
            <div><button><span className="text-color-red">Unfollow</span></button></div>
            <div><button><Link>Go to post</Link></button></div>
            <div><button><span>Share to</span></button></div>
            <div><button><span>Copy link</span></button></div>
            <div><button><span>About this account</span></button></div>
            <div><button className="last-button"><span>Cancel</span></button></div>
        </div>
    )
}

function PostImageContainer({ src }) {
    return (
        <div className="post-image-container">
            <img className="post-image" src={src} />
        </div>    
    )
}

function LikePostContainer() {

    const [ selected, setSelected ] = useState(false);

    function handleClick() {
        setSelected(!selected);
    }
    
    return <div onClick={handleClick}><LikePostIcon selected={selected} /></div>;
}

function CommentPostContainer() {

    return <div><CommentPostIcon /></div>;
}

function SendPostContainer() {

    return <div><SendPostIcon /></div>;
}

function SavePostContainer() {

    const [ selected, setSelected ] = useState(false);

    function handleClick() {
        setSelected(!selected);
    }

    return <div onClick={handleClick}><SavePostIcon selected={selected} /></div>;
}

function PostLikesCountContainer({ likes }) {

    return (
        <div className="post-likes-count-container HORI-PAD-16">
            <span className="post-likes-count">{`${likes.length} likes`}</span>
        </div>
    )
}

function PostCaptionContainer({ username, caption }) {

    const [ showMore, setShowMore ] = useState(false);
    const [ showButton, setShowButton ] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        if (ref.current) {
            setShowButton(ref.current.clientHeight !== ref.current.scrollHeight);
        }
    }, [showMore])

    function handleShowMore() {
        setShowMore(true);
    }

    return (
        <>
            <div ref={ref} className={`post-caption-container ${(!showMore) ? 'show-less' : null} HORI-PAD-16`}>
                <span className="post-caption">
                    <b> { username } </b>
                    { caption }
                </span>
            </div>

            { showButton &&
                <div className="post-caption-more-button-container HORI-PAD-16">
                    <button onClick={handleShowMore} className="post-caption-more-button">more...</button>
                </div>
            }   
        </>
    )
}

function PostCommentsCountContainer() {
    
    return (
        <div className="post-comments-count-container HORI-PAD-16">
            <span className="post-comments-count">View all 106 comments</span>
        </div>
    )
}

function PostTimeContainer({ createdAt }) {

    return (
        <div className="post-time-container HORI-PAD-16">
            <span className="post-time"> {createdAt} </span>
        </div>
    )
}

export { 
    PostOptionContainer, ClickedPostOptionContainer, PostImageContainer,
    LikePostContainer, CommentPostContainer, SendPostContainer, SavePostContainer,
    PostLikesCountContainer, PostCaptionContainer, PostCommentsCountContainer, PostTimeContainer,
    Header,
};