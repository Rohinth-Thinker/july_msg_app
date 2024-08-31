import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const FileContext = createContext();

export const useFileContext = () => useContext( FileContext );

export const FileContextProvider = ({ children }) => {

    const [ file, setFile ] = useState();
    
    return (
        <FileContext.Provider value={{ file, setFile }}>
            { children }
        </FileContext.Provider>
    )
}