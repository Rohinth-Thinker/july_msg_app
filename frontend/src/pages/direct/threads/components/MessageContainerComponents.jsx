import { BackButtonIcon } from "../../../../../public/icons/ProfilePageIcons";
import { ImageAttachmentIcon, MessageInfoIcon } from "../../../../../public/icons/DirectPageIcon";
import { FaUser } from "react-icons/fa";
import IntroProfile from "../../../List/IntroProfile";

function MessageContainerHeader({ handleSwitchPage }) {

    return (
        <div className="message-container-header border-bottom">
            <div className="left-section" >
                <HeaderBackButton />
            </div>
            <div className="middle-section" >
                <MessageToWhichUser />
            </div>
            <div onClick={() => handleSwitchPage(false)} className="right-section" >
                <MessageInfoButton />
            </div>
        </div>
    )
}

function HeaderBackButton() {

    return <BackButtonIcon />
}

function MessageInfoButton() {

    return <MessageInfoIcon />
}

function MessageToWhichUser() {
    
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
                    <span>Barath Krishnan</span>
                </div>

                <div className="user-active-status">
                    <span>Active 5 m ago</span>
                </div>
            </div>
        </div>
    )
}

function Messages() {

    return (
        <div className="messages"></div>
    )
}

function MessageInputContainer() {
    
    return (
        <div className="message-input-container">
            <div>
                <form>
                    <input placeholder="Message..." />
                </form>

                <div className="message-image-attachment-container">
                    <ImageAttachmentIcon />
                </div>
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

function MessageDetailsMembersContainer() {
    
    return (
        <div className="message-details-members-container border-bottom">
            <div className="members-container">
                <span className="text-members">Members</span>
            </div>

            <IntroProfile userProfile={{username : "disturbing_heart", userFollowers : [1, 2]}} />
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