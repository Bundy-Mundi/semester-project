import React, { useState, useEffect } from "react";
import {SocketContext, socket} from './socket';
import socketIOClient from "socket.io-client";
import Header from "./Header";
import Main from "./Main";
import { SOCKET_URL } from "./config";

function App() {
  const [socketID, setSocketID] = useState("");
  useEffect(() => {
    const socket = socketIOClient(SOCKET_URL);
    socket.on("new id", ({ id: newID }) => {
      if(!localStorage.getItem("socket-id")){
        localStorage.setItem("socket-id", newID);
        setSocketID(newID);
      } else {
        setSocketID(localStorage.getItem("socket-id"));
      }
      socket.emit("new connection", {
        type: "notification",
        sender: socketID,
        date: Date.now()
      })
    });
  },[]);

  return (
    <SocketContext.Provider value={socket}>
      <Header/>
      <Main socket={socket} socketID={socketID}/>
    </SocketContext.Provider>
  );
}


export default App;
