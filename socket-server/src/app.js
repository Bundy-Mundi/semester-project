require('dotenv').config();
import "@babel/polyfill";
import express from "express";
import session from "express-session";
import cors from "cors";
import http from "http";
import socketIo from "socket.io";
import index from "./routes/index";
import User from "./mongodb/user";
import Message from "./mongodb/message";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";

const port = process.env.PORT || 4001;
const client_url = process.env.CLIENT_URL || "http://localhost:3000";
const app = express();
const dev_mongo_url = "mongodb://localhost:27017/socket";
const MONGOSTORE_OPT = {
    mongoUrl: dev_mongo_url
};
const SESSION_OPT = {
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create(MONGOSTORE_OPT)
};
const CORS_OPT = {
    origin: client_url,
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
var sessionMiddleware = session(SESSION_OPT);
app.use(cors(CORS_OPT));
app.use(sessionMiddleware);
app.use((req,res,next) => {
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
})
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
chatRoute.use((socket, next)=>{
    sessionMiddleware(socket.request, socket.request.res || {}, next);
})
chatRoute.on('connection', (socket) => {
    console.log("New client connected");
    socket.on("new connection", async({userID}) => {
        if(mongoose.Types.ObjectId.isValid(userID)){
            const { username } = await User.findById(userID);
            io.of("/chat").emit("notification", { type:"notification:joined", username, error:null });
        }
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
