import { useState } from "react";
import { useEffect } from "react";
import { FaUser } from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";
import { NewChatIcon } from "../../../../../public/icons/DirectPageIcon";
import { GoDotFill } from "react-icons/go";
import { useAuthContext } from "../../../../context/AuthContext";
import LoadingIndicator from "../../../../comp/LoadingIndicator";
import { GenerateProfilePhoto } from "../../../../comp/ProfileGenerator";

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
    const [ conversations, setConversations ] = useState(null);

    useEffect(() => {
        async function fetchAllConversations() {
            const response = await fetch('/api/conversation/get/all/conversations');
            if (!response.ok) return;

            const results = await response.json();
            if (results.length === 0) {
                setMembersProfiles([]);
                return;
            }

            const members = await Promise.all(results.map(async (conversation) => {
                const username = conversation.conversation.find((username) => username !== authUser.username);

                const usernames = conversation.conversation.filter((username) => username !== authUser.username);
                const profiles = await Promise.all(usernames.map(async (username) => {
                    const res = await fetch(`/api/users/${username}`);
                    const profile = await res.json();

                    return profile;
                }))

                return { conversationId : conversation._id, username, profiles };
            }) )

            
            const profiles = await Promise.all(members.map(async (member) => {
                const response = await fetch(`/api/users/${member.username}`);
                if (!response.ok) return;

                const profile = await response.json();
                return { conversationId : member.conversationId, ...profile, profiles : member.profiles };
            }))

            setConversations(profiles);
        }

        if (authUser) fetchAllConversations();
    }, [authUser])

    if (!conversations) {
        return <LoadingIndicator />;
    }

    return (
        <div className="conversation-list-container">            
            { conversations.length > 0 ?
                <DisplayConversation conversations={conversations} />
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

function DisplayConversation({ conversations }) {
    return (
        <div className="conversations">
            {
                conversations.map((convo) => <Conversation convo={convo} key={convo.conversationId} />)
            }
        </div>
    )
}


function Conversation({ convo }) {
    let profile;
    if (convo.profiles.length === 1) profile = convo.profiles[0];
    else {
        const username = convo.profiles.map((profile) => ' ' + profile.username).toString();
        profile = { username };
    }

    return (
        <Link to={`/direct/t/${convo.conversationId}`} className="conversation-container">

            <div className="story-container aItems-start" style={{width: '60px'}}>
                <GenerateProfilePhoto src={profile?.userProfilePic} size={56} />
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