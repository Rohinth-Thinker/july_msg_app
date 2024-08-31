import { createContext, useContext, useState } from "react";


const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({children}) => {

    const [ authUser, setAuthUser ] = useState({ username : 'rohinth_thinker' });

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }} >
            { children }
        </AuthContext.Provider>
    )
}