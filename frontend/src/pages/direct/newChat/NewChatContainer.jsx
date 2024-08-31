import { NewChatHeader, NewChatSearchContainer } from "./components/NewChatContainerComponents";

import './styles/NewChatContainer.css';

function NewChatContainer() {

    return (
        <div className="new-chat-container">
            <NewChatHeader />
            <NewChatSearchContainer />
        </div>
    )
}

export default NewChatContainer;