import { createContext } from 'react';
import io from 'socket.io-client';

const connectionOptions =  {
    "force new connection" : true,
    "reconnectionAttempts": "Infinity", //avoid having user reconnect manually in order to prevent dead clients after a server restart
    "timeout" : 10000, //before connect_error and connect_timeout are emitted.
    "transports" : ["websocket"]
};

export const socket = io('http://localhost:8000', connectionOptions);
export const socketContext = createContext();