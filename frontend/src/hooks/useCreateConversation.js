import { useState } from "react";

function useCreateConversation() {
    const [ loading , setLoading ] = useState(false);

    const createConversation = async (receivers) => {
        try {
            setLoading(true);
            const response = await fetch('/api/conversation/new', {
                method : "POST",
                body : JSON.stringify({ receivers }),
                headers : {
                    "Content-Type" : "application/json",
                }
            })

            const result = await response.json();
            setLoading(false);
            if (result.error) {
                return { status : false, msg : result.error };
            }

            const conversationId = result.id;

            return { status : true, conversationId };

        } catch(err) {
            setLoading(false);
            return { status : false, msg : err.message };
        }
    }

    return [ loading, createConversation ];
}

export default useCreateConversation;