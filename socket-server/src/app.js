require('dotenv').config();
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const port = process.env.PORT || 4001;
const client_url = "http://localhost:3000";
const index = require("./routes/index");
import mongoose from "mongoose";
import User from "./mongodb/user";

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

io.on('connection', async(socket) => {
    console.log("New client connected");
    const id = new mongoose.Types.ObjectId(); // replace with mogodb
    const user = new User({username: "Test user"});
    await user.save();
    (async() => {
        try{
        const exists = await User.findById(user.id)
        console.log(exists)
        }catch(err){
            console.log(err);
        }
        
    })()
    console.log(user)
    socket.emit("new id", { id });
    socket.on("send chat", (data) => {
        socket.broadcast.emit("recieve chat", data)
    })
    socket.on("new connection", (data) => {
        console.log(data)
        io.emit("notification", data)
    })
    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
})

server.listen(port, () => console.log(`Listening on port ${port}`));