import { useState } from "react";
import { useEffect } from "react";
import { FaUser } from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";
import { NewChatIcon } from "../../../../../public/icons/DirectPageIcon";
import { GoDotFill } from "react-icons/go";
import { useAuthContext } from "../../../../context/AuthContext";
import LoadingIndicator from "../../../../comp/LoadingIndicator";

function NewChatButton() {

    function handleClick() {
        // const navigate = useNavigate();
        // navigate('/direct/new');
        location.href = '/direct/new';
    }

    return (
        <div onClick={handleClick}>
            <NewChatIcon />
        </div>
    )
}

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

    const { authUser } = useAuthContext();
    const [ membersProfile, setMembersProfiles ] = useState(null);

    useEffect(() => {
        async function fetchAllConversations() {
            const response = await fetch('/api/conversation/get/all/conversations');
            if (!response.ok) return;

            const results = await response.json();
            if (results.length === 0) {
                setMembersProfiles([]);
                return;
            }

            const members = results.map((conversation) => {
                const username = conversation.conversation.find((username) => username !== authUser.username);
                return { conversationId : conversation._id, username };
            })    

            const profiles = await Promise.all(members.map(async (member) => {
                const response = await fetch(`/api/users/${member.username}`);
                if (!response.ok) return;

                const profile = await response.json();
                return { conversationId : member.conversationId, ...profile };
            }))

            setMembersProfiles(profiles);
        }

        if (authUser) fetchAllConversations();
    }, [authUser])

    if (!membersProfile) {
        return <LoadingIndicator />;
    }

    return (
        <div className="conversation-list-container">            
            { membersProfile.length > 0 ?
                <DisplayConversation membersProfile={membersProfile} />
                    :
                <DisplayNoConversation />
            }
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

function DisplayConversation({ membersProfile }) {

    return (
        <div className="conversations">
            {
                membersProfile.map((profile) => <Conversation profile={profile} key={profile.conversationId} />)
            }
        </div>
    )
}


function Conversation({ profile }) {

    return (
        <Link to={`/direct/t/${profile.conversationId}`} className="conversation-container">

            <div className="story-container aItems-start" style={{width: '60px'}}>
                <div className="story-profile-pic-container WH-56">
                    <FaUser style={{color:"white", width:'72%', height:'72%'}} />
                    {/* <img src="profile-pic.jpg" style={{width: "100%", height: "100%", borderRadius: '50%'}} /> */}
                </div>
            </div>

            <div className="conversation-details-container">
                <span className="username">{ profile.username }</span>
                <div className="new-messages">
                    <GoDotFill className="dot" />
                </div>
            </div>

        </Link>

    )
}


export { InboxHeader, ConversationContainer, NewChatButton };