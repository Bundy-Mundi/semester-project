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
    { 
        id: 1, 
        firstName: "Ben", 
        lastName:"Kweon", 
        email:"ben@gmail.com",
        img_url:"",
        bio:"" 
    },
    { 
        id: 2, 
        firstName: "Nancy", 
        lastName:"Anatuanya", 
        email:"nchidiafoma@gmail.com",
        img_url:"",
        bio:""
    },
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
app.get("/cv", setLocals, (req, res) => {
    res.locals.pageTitle = "CV";
    res.render("pages/cv.pug");
});
app.get("/about", setLocals, (req, res) => {
    res.locals.pageTitle = "About";
    res.render("pages/about.pug");
});
app.use('/api/v1', apiRouter);
app.use('/error', errorRouter);

/* Server */
app.listen(port, () => console.log(`\nListening On: http://localhost:${port}\n\nMode: ${NODE_ENV}`));
