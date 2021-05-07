import React, { useState, useEffect } from "react";
import {SocketContext, socket} from './socket';
import socketIOClient from "socket.io-client";
import Header from "./components/Header";
import Main from "./components/Main";
import { SOCKET_URL } from "./config";

function App() {
  const [socketID, setSocketID] = useState("");
  const [username, setUsername] = useState("");
  useEffect(() => {
    const socket = socketIOClient(SOCKET_URL);
    const originalID = localStorage.getItem('socket-id');
    const originalUsername = localStorage.getItem('username');
    const data = {
      type: "notification",
      sender: originalID,
      date: Date.now()
    }
      if(!originalID) { // If there's no ID, sender is null => then server will give a new ID
        data.sender = null;
        socket.on("new id", ({ id: newID, username }) => {
          localStorage.setItem("socket-id", newID);
          setSocketID(newID);
          setUsername(username);
      });
    }
    socket.emit("new connection", data);
    setSocketID(originalID);
    setUsername(originalUsername);
  },[]);

  return (
    <SocketContext.Provider value={socket}>
      <Header/>
      <Main socketID={socketID} username={username}/>
    </SocketContext.Provider>
  );
}

export default App;
