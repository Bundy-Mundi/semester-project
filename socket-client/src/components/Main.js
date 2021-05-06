import React, { useState, useEffect, useContext } from "react";
import {SocketContext} from '../socket';
const MessageComponent = ({sender, message}) => {
    return (
        <li>
            <p>
                {sender} : {message}
            </p>
        </li>
    )
}
const NotificationComponent = ({sender, message}) => {
    return (
        <li>
            <p>
                Notification
                {sender} : {message}
            </p>
        </li>
    )
}

const Main = ({ socketID }) => {
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);
    const socket = useContext(SocketContext);
    
    useEffect(() => {
        socket.on("recieve chat", (data) => {
            setChat((chat)=>[...chat, data]);
        })
        socket.on("notification", (data) => {
            setChat((chat) => [...chat, data]);
        })
    },[])
    const HandleSubmit = (e) => {
        e.preventDefault();
        const data = { 
            type:"message",
            sender:socketID, 
            message,
            date: Date.now(),
         }
        setChat((chat)=>[...chat, data]);
        socket.emit("send chat", data);
        setMessage("");
    }
    return (
        <main className="w-full bg-gray-100 h-screen flex items-center justify-center">
            <div className="flex flex-col h-3/4 w-3/4 p-6 rounded shadow-2xl bg-gray-200">
                <ul id="chat-display" class="h-full w-full overflow-y-scroll">
                {
                    chat.map((v, k) => {
                        return (v.type === "notification") 
                            ? <NotificationComponent {...v} message="has joined" key={k}/> : <MessageComponent {...v}  key={k}/>
                    })
                }
                </ul>
                <div className="h-20 w-full p-2">
                    <form id="chat-input" onSubmit={e => HandleSubmit(e)} className="h-full flex items-center justify-center">
                        <input type="text" className="w-full h-full p-1 text-left" onChange={e => setMessage(e.target.value)} value={message}/>
                        <button type="submit" class="h-full w-16 bg-gray-300">Send</button>
                    </form>
                </div>
            </div>
        </main>
    )
}

export default Main;