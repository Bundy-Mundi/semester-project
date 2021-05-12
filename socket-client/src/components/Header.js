import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="bg-white h-20 shadow-2xl">
            <nav className="h-full w-full p-6">
                <ul className="h-full w-1/12 items-center flex justify-between">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/chat">Chat</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;