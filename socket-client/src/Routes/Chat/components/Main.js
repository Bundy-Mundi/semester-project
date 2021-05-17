import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { SocketContext } from "../../../socket";
import useQuery from "../../../utils/useQuery";
import ErrorMessage from "./ErrorMessage";

const MessageComponent = ({sender, message}) => {
    let username = "Ananymous User";
    if(sender)
        username = sender.username;
    return (
        <li>
            <p>
                <strong>{username}</strong>: {message}
            </p>
        </li>
    )
}
const NotificationComponent = ({username, type}) => {
    let bgColor = function(type){
        switch(type){
            case "notification:joined":
                return "bg-blue-500";
            case "notification:left":
                return "bg-red-500";
            default:
                return "bg-blue-500";
        }
    }
    let message = function(type){
        switch(type){
            case "notification:joined":
                return "has joined";
            case "notification:left":
                return "has left";
            default:
                return "has joined";
        }
    }
    return (
        <li>
            <div class={`w-full lg:w-1/3 xl:w-1/3 flex items-center ${bgColor(type)} text-white text-sm font-bold px-4 py-3`} role="alert">
                <svg class="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
                <strong>{username}</strong><p class="ml-1">{message(type)}</p>
            </div><br/>
        </li>
    )
}

const Main = () => {
    const [message, setMessage] = useState("");
    const [error, setError] = useState(null);
    const [chat, setChat] = useState([]);
    const socket = useContext(SocketContext);
    let query = useQuery();
    
    useEffect(() => {
        async function fetchUserCheck(){
            try{
                const { data } = await axios.get(`/user/check?id=${query.get("id")}&username=${query.get("username")}`);
                setError(data);
            } catch(error){
                console.log(error);
            }
        }
        fetchUserCheck();

        // Socket Config
        if(error === null){
            socket.emit("new connection", {userID: query.get("id")});
        }
        socket.on("recieve chat", (data) => {
            if(data.error === null)
                setChat((chat)=>[...chat, data]);
        })
        socket.on("notification", (data) => {
            if(data.error === null)
                setChat((chat) => [...chat, data]);
        })
        return () => {
            socket.off("custom disconnect", { id:query.get('id') })
        };
    },[])
    const HandleSubmit = (e) => {
        e.preventDefault();
        socket.emit("send chat", {
            type:"message",
            sender: query.get("id"),
            error:null,
            message
        });
        setMessage("");
    }
    if(error !== null)
        if(!error.ok)
            return <ErrorMessage message={error.message}/>;
    return (
        
        <main className="w-full bg-gray-100 h-screen flex items-center justify-center">
            <div className="flex flex-col h-3/4 w-3/4 p-6 rounded shadow-2xl bg-gray-200">
                <ul id="chat-display" class="h-full w-full overflow-y-scroll">
                {
                    chat.map((v, k) => {
                        console.log(v)
                        if(v.type==="notification:joined") 
                            return <NotificationComponent {...v} key={k}/>
                        else if(v.type==="notification:left")
                            return <NotificationComponent {...v} key={k}/>
                        else if(v.type==="message")
                            return <MessageComponent {...v}  key={k}/>
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