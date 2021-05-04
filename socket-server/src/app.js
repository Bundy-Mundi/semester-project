require('dotenv').config();
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const port = process.env.PORT || 4001;
const client_url = "http://localhost:3000";
const index = require("./routes/index");
import { v4 as uuidv4 } from 'uuid';

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

io.on('connection', (socket) => {
    console.log("New client connected");
    const id = uuidv4();
    socket.emit("new id", { id });
    socket.on("send chat", (data) => {
        socket.broadcast.emit("recieve chat", data)
    })
    socket.on("new connection", (data) => {
        io.emit("notification", data)
    })
    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
})



server.listen(port, () => console.log(`Listening on port ${port}`));