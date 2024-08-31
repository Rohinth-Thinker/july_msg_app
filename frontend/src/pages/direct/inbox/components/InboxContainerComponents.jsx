import { FaUser } from "react-icons/fa";

import { Link } from "react-router-dom";


function InboxHeader() {

    return (
        <div className="inbox-header-container">
            <div className="left-section">
                <span className="header">Messages</span>
            </div>

            <div className="right-section">
                <Link className="request-followers-link">Request</Link>
            </div>
        </div>
    )
}

function ConversationContainer() {

    return (
        <div className="conversation-list-container">
            {/* <DisplayNoConversation /> */}
            <DisplayConversation />
        </div>
    )
}

function DisplayNoConversation() {

    return (
        <div className="no-conversation-container">
            <span className="text-no-messages-found"> No Messages Found </span>
        </div>
    )
}

function DisplayConversation() {

    return (
        <div className="conversations">
            <Conversation />
            <Conversation />
            <Conversation />
        </div>
    )
}


function Conversation() {

    return (
        <div className="conversation-container">
            <div className="story-container aItems-start" style={{width: '60px'}}>
                <div className="story-profile-pic-container WH-56">
                    <FaUser style={{color:"white", width:'72%', height:'72%'}} />
                    {/* <img src="profile-pic.jpg" style={{width: "100%", height: "100%", borderRadius: '50%'}} /> */}
                </div>
            </div>

            <div className="conversation-details-container">
                <span className="username">disturbing_heart</span>
                <div className="new-messages">.</div>
            </div>

        </div>
    )
}


export { InboxHeader, ConversationContainer };