import { useState } from 'react';
import validateInputs from "../components/validateInputs";

function useAuth(endpoint) {
    const [ loading, setLoading ] = useState(false);

    const authenticate = async (inputs) => {
        try {
            setLoading(true);

            const validation = validateInputs(inputs);
            if (!validation.status) {
                setLoading(false);
                return validation;
            }
            
            const response = await fetch(`/api/auth/${endpoint}`, {
                method : "POST",
                body : JSON.stringify(inputs),
                headers : {
                    "Content-Type" : "application/json",
                },
            })
            const result = await response.json();
            setLoading(false);
            if (result.error) {
                return { status : false, msg : result.error };
            }

            return { status : true };
        } catch(err) {
            setLoading(false);
            throw err;
        }
    }

    return [ loading, authenticate ];
}


export default useAuth;