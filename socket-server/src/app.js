require('dotenv').config();
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const port = process.env.PORT || 4001;
const client_url = "http://localhost:3000";
const index = require("./routes/index");
import mongoose from "mongoose";
import User from "./mongodb/user";
import Message from "./mongodb/message";

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
    socket.on("send chat", async({sender, type, message, date}) => {
        // Add if there exists user
        let error = "";
        try{
            await new Message({
                sender,
                type,
                message,
                date
            }).save();
        }catch(err){
            error = err;
        }
        socket.broadcast.emit("recieve chat", {sender, type, message, date, error});
    });
    socket.on("new connection", ({type, sender, date}) => {
        console.log(type, sender, date)
        let id = sender;
        if(sender === null){
            id = new mongoose.Types.ObjectId(); 
        }
        io.emit("new id", { id });
        io.emit("notification", { type, sender:id, date });
    });
    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
})

server.listen(port, () => console.log(`Listening on port ${port}`));