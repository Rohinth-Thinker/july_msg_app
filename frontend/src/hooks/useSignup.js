import { useState } from 'react';
import validateInputs from "../components/validateInputs";

function useSignup() {
    const [ loading, setLoading ] = useState(false);

    const signup = async (inputs) => {
        try {
            setLoading(true);

            const validation = validateInputs(inputs);
            if (!validation.status) {
                setLoading(false);
                return validation;
            }
            
            const response  = await fetch("http://localhost:3000/api/auth/signup", {
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

    return [ loading, signup ];
}


export default useSignup;