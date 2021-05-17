import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import config from "../../config";
import publicIP from "public-ip";
const Home = () => {
    const [ authState, setAuthState ] = useState("signup");
    const [ username, setUsername ] = useState("");
    const [ user, setUser ] = useState(null);
    const [ errorMsg, setErrorMsg ] = useState("");
    const [ address, setAddress ] = useState("");
    (async ()=>{
        setAddress(await publicIP.v4());
    })();

    const handleSubmit = async(e) => {
        e.preventDefault();
        let url = config.SERVER_URL + "/user/new";
        if(authState === 'login')
            url = config.SERVER_URL + "/user/login";
        try{
            const { data:{ error, user } } = await axios.post(url, { username, address });
            if(user)
                console.log("ID:", user._id);
            if(error)
                setErrorMsg(error.message);
            setUsername("");
            setUser(user);
        } catch(err){
            console.log(err)
        }
    }

    if(user){
        return <Redirect to={`/chat?id=${user._id}&username=${user.username}`}/>
    }
    return(
            <div className="h-screen w-full flex items-center justify-center">
                <h1 className="text-center z-index-10 text-2xl absolute top-40 ">Your Public IP is <p className="text-4xl mt-3 font-bold">{address}</p></h1>

                <form className="flex items-center justify-evenly flex flex-col h-1/2 w-4/5 md:w-1/2 lg:w-1/3 xl:w-1/3 2xl:w-1/3 p-6 rounded shadow-2xl bg-gray-200" onSubmit={e => handleSubmit(e)}>
                    <span id="text-box" className="h-auto flex flex-col items-center">
                        <p className="text-center w-full text-2xl xl:text-3xl 2xl:text-3xl">{authState === 'login'? "Login": "Sign Up"}</p>
                        <p className="font-bold font-sm text-red-500">{errorMsg}</p>
                    </span>
                    <div className="h-1/2 w-full xl:w-3/4 2xl:w-3/4 flex flex-col items-center justify-evenly">
                        <input required id="username" className="transition-all focus:shadow-lg w-full h-12 p-2 rounded" onChange={e => setUsername(e.target.value)} placeholder="Type Username" value={username}></input>
                        <button className="transition-all hover:bg-gray-700 hover:text-white hover:shadow-lg xl:text-lg 2xl:text-lg border border-gray-900 rounded w-full h-12 p-2" type="submit">Submit</button>
                        <div className="w-1/2 flex items-center justify-between">
                            <p className={`${authState === 'signup' ? "font-bold": ""} xl:text-base 2xl:text-base cursor-pointer text-center text-xs text-gray-900`} onClick={() => {
                                setAuthState('signup');
                                setErrorMsg("");
                            }}>Sign Up</p>
                            |
                            <p className={`${authState === 'login' ? "font-bold": ""} xl:text-base 2xl:text-base cursor-pointer text-center text-xs text-gray-900`} onClick={() => {
                                setAuthState('login');
                                setErrorMsg("");
                            }}>Login</p>
                        </div>
                    </div>
                </form>
            </div>
        );
}

export default Home;