require('dotenv').config();
import path from 'path';
import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import apiRouter from "./routers/apiRouter";
import errorRouter from './routers/errorRouter';
import { setLocals, setQueryString } from "./middlewares";

const app = express();
const {
    PORT,
    NODE_ENV = 'development',
} = process.env;

const port = PORT || 5000;
const IS_PROD = (NODE_ENV === 'production');

// Needs to replaced by Redis or Mongo
const DB = [
    { id: 1, name: "Ben", email:"ben@gmail.com", password: "1234", isAdmin: false},
    { id: 2, name: "Bennie", email:"bennie@gmail.com", password: "1234", isAdmin: false},
    { id: 3, name: "master", email:"master@gmail.com", password: "1234", isAdmin: true},
]

/* Pug setup */
app.set('views', './src/views')
app.set('view engine', 'pug');
app.set('trust proxy', 1) // trust first proxy

/* Middlewares */
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(helmet());
app.use('/static', express.static(path.join(__dirname, 'static')));

/* Routers */
app.get("/", setLocals, setQueryString, (req, res) => {
    res.locals.pageTitle = "Home";
    res.render("pages/home.pug");
});
app.get("/contact", setLocals, (req, res) => {
    res.locals.pageTitle = "Contact";
    res.render("pages/contact.pug");
});
app.use('/api/v1',apiRouter);
app.use('/error',errorRouter);

/* Server */
app.listen(port, () => console.log(`\nListening On: http://localhost:${port}\n\nMode: ${NODE_ENV}`));
