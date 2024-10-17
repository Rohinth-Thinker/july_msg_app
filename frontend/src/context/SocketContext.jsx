import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { io } from 'socket.io-client';
import { useAuthContext } from "./AuthContext";

const SocketContext = createContext(null);

export const useSocketContext = () => useContext(SocketContext);

export const SocketContextProvider = ({ children }) => {

    const [ socket, setSocket ] = useState();
    const [ onlineUsers, setOnlineUsers ] = useState([]);
    const { authUser } = useAuthContext();

    useEffect(() => {
        function connectSocket() {
            const socket = io('http://localhost:3000', {
                query : {
                    username : authUser.username,
                }
            });

            socket.on('connect', () => {
                setSocket(socket);
            })

            return () => {
                socket.off('connect');
            }
        }

        if (authUser) connectSocket();
    }, [ authUser ])


    return (
        <SocketContext.Provider value={{socket}} >
            { children }
        </SocketContext.Provider>
    )
}