import { CommentPostIcon, LikePostIcon, OptionIcon, SavePostIcon, SendPostIcon } from "../../../../public/icons/Post";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

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

function PostImage() {
    return (
        <img className="post-image" src="post2.jpg" />
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

function PostLikesCountContainer() {

    return (
        <div className="post-likes-count-container HORI-PAD-16">
            <span className="post-likes-count">50,333 likes</span>
        </div>
    )
}

function PostCaptionContainer() {
    const captionText = `he Avengers must stop Thanos, 
    an intergalactic warlord, from getting his hands on all the infinity stones.
     However, Thanos is prepared to go to any lengths to carry out his insane plan.`;

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
                    <b>marvelworld.in </b>
                    {captionText}
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

function PostTimeContainer() {

    return (
        <div className="post-time-container HORI-PAD-16">
            <span className="post-time">2 days ago</span>
        </div>
    )
}

export { 
    PostOptionContainer, ClickedPostOptionContainer, PostImage,
    LikePostContainer, CommentPostContainer, SendPostContainer, SavePostContainer,
    PostLikesCountContainer, PostCaptionContainer, PostCommentsCountContainer, PostTimeContainer
};