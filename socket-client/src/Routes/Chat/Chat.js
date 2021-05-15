import React from "react";
import { socket, SocketContext } from "../../socket";
import Main from "./components/Main";

function Chat() {
  return (
    <SocketContext.Provider value={socket}>
      <Main/>
    </SocketContext.Provider>
  );
}

export default Chat;
