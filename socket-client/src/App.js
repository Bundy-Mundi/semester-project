import React, { useState, useEffect } from "react";
import { SocketContext, socket } from './socket';
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
    let data = {
      type: "notification:joined",
      sender: originalID,
      date: Date.now()
    }
    if(!originalID) { // If there's no ID in localstorage, set sender as null => then server will give a new ID
      data.sender = null;
      socket.emit("new connection", data);
      socket.on("new id", ({ id: newID, username:newUsername }) => {
        console.log(newID, newUsername)
        localStorage.setItem("socket-id", newID);
        localStorage.setItem("username", newUsername);
        setSocketID(newID);
        setUsername(newUsername);
      });
    } else if(originalID && !originalUsername) {
      socket.emit("new username", {id:originalID});
      socket.on("new username", ({username})=>{
        console.log(`new username: ${username}`)
        localStorage.setItem("username", username);
        setSocketID(originalID);
        setUsername(username);
      });
      socket.emit("new connection", data);
    }
    socket.emit("new connection", data);
  },[]);

  return (
    <SocketContext.Provider value={socket}>
      <Header/>
      <Main socketID={socketID} username={username}/>
    </SocketContext.Provider>
  );
}

export default App;
