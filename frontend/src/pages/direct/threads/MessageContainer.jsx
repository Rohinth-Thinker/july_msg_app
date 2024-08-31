import { useState } from "react";
import { MessageContainerHeader, MessageDetailsHeader, MessageDetailsMembersContainer, MessageDetailsOperationsContainer, MessageInputContainer, Messages } from "./components/MessageContainerComponents";
import './style/MessageContainer.css';

function MessageContainer() {
    const [ switchPage, setSwitchPage ] = useState(true);

    function handleSwitchPage(result) {
        setSwitchPage(result);
    }

    function showPage() {
        if (switchPage) {
            return (
                <>
                    <MessageContainerHeader handleSwitchPage={handleSwitchPage} />
                    <Messages />
                    <MessageInputContainer />
                </>
            )
        }

        return (
            <>
                <MessageDetailsHeader handleSwitchPage={handleSwitchPage} />
                <MessageDetailsMembersContainer />
                <MessageDetailsOperationsContainer />
            </>
        )
    }

    return (
        <div className="message-container">
            { showPage() }
        </div>
    )
}

export default MessageContainer;