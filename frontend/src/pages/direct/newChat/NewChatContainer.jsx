import { useState } from "react";
import { NewChatHeader, NewChatSearchContainer } from "./components/NewChatContainerComponents";

import './styles/NewChatContainer.css';

function NewChatContainer() {

    const [ selectedUsers, setSelectedUsers ] = useState([]);

    function handleSelection(username) {
        if (!selectedUsers.includes(username)) {
            return setSelectedUsers([...selectedUsers, username]);
        }

        const filteredArray = selectedUsers.filter((user) => user !== username);
        setSelectedUsers(filteredArray);
    }

    return (
        <div className="new-chat-container">
            <NewChatHeader users={selectedUsers} />
            <NewChatSearchContainer selectedUsers={selectedUsers} handleSelection={handleSelection} />
        </div>
    )
}

export default NewChatContainer;