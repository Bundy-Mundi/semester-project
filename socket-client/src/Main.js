import React, { useState, useEffect, useContext } from "react";
import {SocketContext} from './socket';
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
        console.log('FIRED')
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
            <div className="relative h-3/4 w-3/4 border border-black">
                {
                    chat.map((v, k) => {
                        return (v.type === "notification") 
                            ? <NotificationComponent {...v} message="has joined" key={k}/> : <MessageComponent {...v}  key={k}/>
                    })
                }
            <form onSubmit={e => HandleSubmit(e)} className="p-1 h-10 w-full absolute bottom-0 flex items-center justify-center">
                <input type="text" className="w-3/4 h-full" onChange={e => setMessage(e.target.value)} value={message}/>
                <button type="submit">Send</button>
            </form>
            </div>

        </main>
    )
}

export default Main;