import React, { useState, useEffect } from "react";
import {SocketContext, socket} from './socket';
import socketIOClient from "socket.io-client";
import Header from "./components/Header";
import Main from "./components/Main";
import { SOCKET_URL } from "./config";

function App() {
  const [socketID, setSocketID] = useState("");
  useEffect(() => {
    const socket = socketIOClient(SOCKET_URL);
    const originalID = localStorage.getItem('socket-id');
    const data = {
      type: "notification",
      sender: originalID,
      date: Date.now()
    }
    if(!originalID) { // If there's no ID, sender is null => then server will give a new ID
      data.sender = null;
    }
    socket.emit("new connection", data)
    socket.on("new id", ({ id: newID }) => {
        localStorage.setItem("socket-id", newID);
        setSocketID(newID);
    });
    setSocketID(originalID);
  },[]);

  return (
    <SocketContext.Provider value={socket}>
      <Header/>
      <Main socket={socket} socketID={socketID}/>
    </SocketContext.Provider>
  );
}


export default App;
