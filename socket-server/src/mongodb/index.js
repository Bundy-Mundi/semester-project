require('dotenv').config();
import mongoose, { mongo } from "mongoose";

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    poolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
};
let mongo_url = process.env.MONGO_URL;

if(process.env.NODE_ENV === "development")
    mongo_url = "mongodb://localhost:27017/socket";

(async()=>{
    mongoose.connection.on('connect', () => {
        console.log("MongoDB connected!");
    });
    mongoose.connection.on('error', err => {
        console.log(err);
    });
    mongoose.connection.on('disconnected', (err) => {
        console.log("MongoDB disconnected.\n", err);
    });
    try{
        await mongoose.connect(mongo_url, {useNewUrlParser: true, useUnifiedTopology: true });
        console.log("MongoDB Connected");
    } catch (error) {
        console.log(error);
    }

})();
