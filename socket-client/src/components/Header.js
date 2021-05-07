import React from "react";

const Header = () => {
    return (
        <header className="bg-white h-20 shadow-2xl">
            <nav className="h-full w-full p-6">
                <ul className="h-full items-center flex">
                    <li><a>Home</a></li>
                    <li><a>Chat Log</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;