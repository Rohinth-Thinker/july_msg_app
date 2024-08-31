import { ConversationContainer, InboxHeader } from "./components/InboxContainerComponents";

import './styles/InboxContainer.css';

function InboxContainer() {

    return (
        <div className="inbox-container mTop-45">
            <InboxHeader />
            <ConversationContainer />
        </div>
    )
}

export default InboxContainer;