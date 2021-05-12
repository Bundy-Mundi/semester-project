import React from 'react';
import socketIOClient from "socket.io-client";
import config from "./config";
export const socket = socketIOClient(config.SOCKET_URL);
export const SocketContext = React.createContext();