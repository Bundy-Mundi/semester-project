import React, { useState, useEffect } from "react";
import { SocketContext } from './socket';
import socketIOClient from "socket.io-client";
import Main from "./components/Main";

const SOCKET_URL = "http://127.0.0.1:4001/chat";

function App() {
  const socket = socketIOClient(SOCKET_URL);
  useEffect(() => {
    const originalID = localStorage.getItem('socket-id');
    const originalUsername = localStorage.getItem('username');
    socket.emit("new connection", { type: "notification:joined", message: "hello world" });
  },[SOCKET_URL]);

  return (
    
    <SocketContext.Provider value={socket}>
      <Main/>
    </SocketContext.Provider>
  );
}

export default App;
