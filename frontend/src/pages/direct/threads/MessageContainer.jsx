import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import LoadingIndicator from "../../../comp/LoadingIndicator";
import { useAuthContext } from "../../../context/AuthContext";
import { useSocketContext } from "../../../context/SocketContext";
import { MessageContainerHeader, MessageDetailsHeader, MessageDetailsMembersContainer, MessageDetailsOperationsContainer, MessageInputContainer, Messages } from "./components/MessageContainerComponents";
import './style/MessageContainer.css';

function MessageContainer() {
    const [ switchPage, setSwitchPage ] = useState(true);
    const { conversationId } = useParams();
    const [ conversation, setConversation ] = useState(null);
    const [ messages, setMessages ] = useState([]);
    const [ error, setError ] = useState(null);
    const [ membersProfiles, setmembersProfiless ] = useState(null);
    const [ userProfile, setUserProfile ] = useState(null);
    const { authUser } = useAuthContext();
    const { socket } = useSocketContext();

    useEffect(() => {
        if (socket) {

            const handleNewMessage = (newMessage) => {
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            }
            socket.on("newMessage", handleNewMessage);

            return () => {
                socket.off("newMessage", handleNewMessage);
            }
        }
    }, [ socket ])

    useEffect(() => {
        async function fetchConversationMessages() {
            const response = await fetch(`/api/conversation/get/${conversationId}`);
            const result = await response.json();
            if (!response.ok) {
                setError(result.error);
                return;
            }

            const conversation = result.conversation;
            setConversation(conversation);
            setMessages(conversation.messages);
        }
        fetchConversationMessages();
    }, [ conversationId ])

    useEffect(() => {
        async function fetchUserProfile() {
            if (!members) return;

            const profiles = await Promise.all(members.map(async (username) => {
                const response = await fetch(`/api/users/${username}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch profile for ${username}`);
                }

                const profile = await response.json();
                return profile;
            }))

            const up = profiles.find((profile) => profile.username === authUser.username);
            const mp = profiles.filter((profile) => profile.username !== authUser.username);

            setmembersProfiless(mp);
            setUserProfile(up);        
        }

        if (members) fetchUserProfile();
    }, [ conversation ])

    // if (conversation?.conversation.length === 2) {
    //     members = conversation?.conversation.filter((username) => username !== authUser.username);
    // } else {
    //     members = conversation?.conversation;
    // }
    let members = conversation?.conversation;

    // let members = conversation?.conversation.filter((username) => username !== authUser.username);

    function handleSwitchPage(result) {
        setSwitchPage(result);
    }

    function addMessages(details) {
        const message = { ...details, username : authUser.username };
        setMessages(p => [...p, message]);
    }

    function showPage() {
        if (switchPage) {
            return (
                <>
                    <MessageContainerHeader membersProfiles={membersProfiles} handleSwitchPage={handleSwitchPage} />
                    <Messages messages={messages} />
                    <MessageInputContainer conversationId={conversationId} addMessages={addMessages} />
                </>
            )
        }

        return (
            <>
                <MessageDetailsHeader handleSwitchPage={handleSwitchPage} />
                <MessageDetailsMembersContainer  userProfile={userProfile} membersProfiles={membersProfiles} />
                <MessageDetailsOperationsContainer />
            </>
        )
    }

    if (error) return <h1> {error} </h1>;
    if (!membersProfiles) return <LoadingIndicator />;

    return (
        <div className="message-container">
            { showPage() }
        </div>
    )
}

export default MessageContainer;