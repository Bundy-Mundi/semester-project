import React from "react";
import { Link } from "react-router-dom"

const ErrorMessage = ({ message }) => {
    return (
        <div className="h-screen w-full flex items-center justify-center">
            <span className="h-60 w-2/3 bg-white">
                <p className="text-3xl">{message}</p>
                <p className="mt-10 text-blue-500"><Link to="/">Go Back to home</Link></p>
            </span>
        </div>
    );
};

export default ErrorMessage;