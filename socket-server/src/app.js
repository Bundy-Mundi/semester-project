require('dotenv').config();
import express from "express";
import http from "http";
import socketIo from "socket.io";
import index from "./routes/index";
import User from "./mongodb/user";
import Message from "./mongodb/message";

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
    socket.on("new connection", async({userID}) => {
        const { username } = await User.findById(userID);
        io.of("/chat").emit("notification", { type:"notification:joined", username, error:null })
    });
    socket.on("send chat", async(data) => {
        // Save messages in DB
        try{
            if(data.message){
                const { id } = await Message.createMessage(data);
                let message = await Message.findMessage(id);
                io.of("/chat").emit("recieve chat", message);
            }
        }catch(err){
            console.log(err)
        }
    });
    socket.on("disconnect", data => {
        console.log("Client disconnected");
    });
    socket.on("custom disconnect", async({id}) => {
        try {
            console.log(id)
            const { username } = await User.findById(id);
            io.of("/chat").emit("notification", { type:"notification:left", error:null, username });
        } catch (error) {
            console.log(error);
        }
    });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
