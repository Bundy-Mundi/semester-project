import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

const Header = () => {
    const [chatlink, setChatlink] = useState("");
    useEffect(()=>{
        const localID = localStorage.getItem('id');
        const localUsername = localStorage.getItem('username');
        if(localID&&localUsername){
            setChatlink(`/chat?id=${localID}&username=${localUsername}`);
        }else{
            setChatlink("/chat");
        }
    },[])
    return (
        <header className="bg-white h-20 shadow-2xl">
            <nav className="h-full w-full p-6">
                <ul className="h-full w-1/12 items-center flex justify-between">
                    <li><Link to="/">Home</Link></li>
                    <li className="ml-6"><Link to={chatlink}>Chat</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;