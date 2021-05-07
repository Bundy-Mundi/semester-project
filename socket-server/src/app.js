require('dotenv').config();
import express = from("express");
import http = from("http");
import socketIo = from("socket.io");
import index from "./routes/index";
import mongoose from "mongoose";
import User from "./mongodb/user";
import Message from "./mongodb/message";

let count = 1;
const port = process.env.PORT || 4001;
const client_url = process.env.CLIENT_URL || "http://localhost:3000";
const app = express();
app.use(index);

const server = http.createServer(app);
const SOCKET_OPTS = {
    cors: {
        origin: client_url,
        methods: ["GET", "POST"],
        credentials: true
      }
}
const io = socketIo(server, SOCKET_OPTS); // < Interesting!

import "./mongodb";

io.on('connection', (socket) => {
    console.log("New client connected");
    socket.on("send chat", async({type, sender, message, date}) => {
        // Add if there exists user
        let error = "";
        let user = "";
        try{
            if(message){
                await new Message({
                    sender,
                    type,
                    message,
                    date
                }).save();
                user = await User.findById(sender);
            }
        }catch(err){
            error = err;
        }
        socket.broadcast.emit("recieve chat", {username: user.username ? user.username : null, type, message, date, error});
    });
    socket.on("new connection", async({ type, sender, date }) => {
        console.log(type, sender, date);
        const RANDOM_USERNAME = `RANDOM ${count}`;
        let id = sender;
        let user = {};
        try {
            if(!mongoose.isValidObjectId(sender))
                throw new Error("You sent an invalid ID")
            if(sender === null){ // if sender id is null, then create and save new User data with random name
                user = await new User({username:RANDOM_USERNAME}).save();
                io.emit("new id", { id: user.id, username:user.username });
                count++;
            } else {
                user = await User.findById(id);
            }
            if(user)
                io.emit("notification", { type, username:user.username, date, error: null });
            else
                throw new Error("No such user with given ID");
        } catch (error) {
            console.log(error)
            io.emit("notification", { type, username:null, date, error });
        }
    });
    socket.on("disconnect", (socket) => {
        console.log("Client disconnected");
        console.log(socket);
        io.emit("notification", { type:"notification:left", username:null });
    });
})

server.listen(port, () => console.log(`Listening on port ${port}`));
