import { createContext, useContext, useState } from "react";


const MediaContext = createContext(null);

export const useMediaContext = () => useContext( MediaContext );

export const MediaContextProvider = ({ children }) => {

    const [ mediaFile, setMediaFile ] = useState(null);

    return (
        <MediaContext.Provider value={{ mediaFile, setMediaFile }} >
            { children }
        </MediaContext.Provider>
    )
}