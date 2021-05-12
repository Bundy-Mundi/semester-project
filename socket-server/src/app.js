require('dotenv').config();
import express from "express";
import http from "http";
import socketIo from "socket.io";
import index from "./routes/index";
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

const chatRoute = io.of('/chat');
chatRoute.on('connection', (socket) => {
    console.log("New client connected");
    socket.on("new connection", ({type, message}) => {
        io.emit("notification", {type, message})
    });
    socket.on("send chat", async(data) => {
        // Save messages in DB
        try{
            if(data.message){
                await new Message(data).save();
                user = await User.findById(sender);
                io.emit("recieve chat", data);
            }
        }catch(err){
            console.log(err)
        }
    });
    socket.on("disconnect", () => {
        console.log("Client disconnected");
        io.emit("notification", { type:"notification:left" });
    });
})

server.listen(port, () => console.log(`Listening on port ${port}`));
