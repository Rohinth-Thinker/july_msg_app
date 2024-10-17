import { BackButtonIcon } from "../../../../../public/icons/ProfilePageIcons";
import { ImageAttachmentIcon, MessageInfoIcon } from "../../../../../public/icons/DirectPageIcon";
import { FaUser } from "react-icons/fa";
import IntroProfile from "../../../List/IntroProfile";
import { useAuthContext } from "../../../../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function MessageContainerHeader({ userProfile, handleSwitchPage }) {

    return (
        <div className="message-container-header border-bottom">
            <div className="left-section" >
                <HeaderBackButton />
            </div>
            <div className="middle-section" >
                <MessageToWhichUser userProfile={userProfile} />
            </div>
            <div onClick={() => handleSwitchPage(false)} className="right-section" >
                <MessageInfoButton />
            </div>
        </div>
    )
}

function HeaderBackButton() {

    const navigate = useNavigate();

    function handleClick() {
        navigate('/direct/inbox');
    }

    return <div onClick={handleClick}> <BackButtonIcon /> </div>;
}

function MessageInfoButton() {

    return <MessageInfoIcon />
}

function MessageToWhichUser({ userProfile }) {
    
    return (
        <div className="message-to-which-user">
            <div className="user-profile">
                <div className="story-container" style={{width:'30px'}}>
                    <div className="story-profile-pic-container WH-28">
                        <FaUser style={{color:"white", width:'72%', height:'72%'}} />
                        {/* <img src="profile-pic.jpg" style={{width: "100%", height: "100%", borderRadius: '50%'}} /> */}
                    </div>
                </div>
            </div>

            <div className="user-details">
                <div className="username">
                    <span>{ userProfile.username }</span>
                </div>

                <div className="user-active-status">
                    <span>Active 5 m ago</span>
                </div>
            </div>
        </div>
    )
}

function Messages({ messages }) {

    function showMessages() {
        return messages.map((message) => <Message message={message} key={message._id} />)
    }

    return (
        <div className="messages">
            { showMessages() }
        </div>
    )
}

function Message({ message }) {
    const { authUser } = useAuthContext();
    const isSender = authUser.username === message.username;

    return (
        <div className={`message ${isSender ? 'sender': ''}`}>
            <div className={isSender ? 'sender' : ''}>
                <span>{ message.message }</span>
            </div>
        </div>
    )
}

function MessageInputContainer({ conversationId, addMessages }) {
    const [ text, setText ] = useState('');
    const isEmpty = !text || !(text.replaceAll(' ', ''));

    async function handleSubmit(e) {
        e.preventDefault();

        const response = await fetch('/api/conversation/messages/send', {
            method : "POST",
            body : JSON.stringify({ conversationId, message : text }),
            headers : {
                "Content-Type" : "application/json",
            }
        })

        if (!response.ok) return;

        const messageId = await response.json();
        addMessages({ _id : messageId, message : text });

        setText('');
    }
    
    return (
        <div className="message-input-container">
            <div>
                <form onSubmit={handleSubmit} >
                    <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Message..." />
                </form>

                { isEmpty ?
                    <div className="message-image-attachment-container" >
                        <ImageAttachmentIcon />
                    </div>
                        :
                    <button className="default-button-style" onClick={handleSubmit} > Send </button>
                }
            </div>
        </div>
    )
}

function MessageDetailsHeader({ handleSwitchPage }) {

    return (
        <div className="message-container-header border-bottom">
            <div onClick={() => handleSwitchPage(true)} className="left-section" >
                <HeaderBackButton />
            </div>
            <div className="middle-section" >
                <div className="sub-middle-section">
                    <span className="header-text-details">Details</span>
                </div>
            </div>
        </div>
    )
}

function MessageDetailsMembersContainer({ userProfile }) {
    
    return (
        <div className="message-details-members-container border-bottom">
            <div className="members-container">
                <span className="text-members">Members</span>
            </div>

            <IntroProfile userProfile={userProfile} />
        </div>
    )
}

function MessageDetailsOperationsContainer() {

    return (
        <div className="message-details-operations-container">
            <ReportContainer />
            <BlockContainer />
            <DeleteChatContainer />
        </div>
    )
}

function ReportContainer() {

    return (
        <div className="operation-container">
            <button className="default-button-style">Report</button>
        </div>
    )
}

function BlockContainer() {

    return (
        <div className="operation-container">
            <button className="default-button-style">Block</button>
        </div>
    )
}

function DeleteChatContainer() {
    
    return (
        <div className="operation-container">
            <button className="default-button-style" >Delete Chat</button>
        </div>
    )
}

export {
    MessageContainerHeader, Messages, MessageInputContainer,
    MessageDetailsHeader, MessageDetailsMembersContainer, MessageDetailsOperationsContainer
};