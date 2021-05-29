require('dotenv').config();
import path from 'path';
import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import apiRouter from "./routers/apiRouter";
import errorRouter from './routers/errorRouter';
import { setLocals, setQueryString, redirectToStart } from "./middlewares";
import { DB } from "./db";

const app = express();
const {
    PORT,
    NODE_ENV = 'development',
} = process.env;

const port = PORT || 5000;
// const IS_PROD = (NODE_ENV === 'production');
// Needs to replaced by Redis or Mongo

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
    
    // By Nancy
    let template = "pages/start.pug";
    let greeting = '';
    const hour = new Date().getHours();

    switch(hour){
        case(hour >= 6 && hour <= 12):
            greeting = 'Good Morning';
        case(hour > 12 && hour < 18):
            greeting = 'Good Afternoon';
        default:
            greeting = 'Good Evening';
    }
    if(res.locals.username){
        res.locals.greeting = greeting;
        template = "pages/home.pug";
    }
    res.render(template, { data: DB });
});
app.get("/cv/:id", setLocals, setQueryString, redirectToStart, (req, res) => {
    res.locals.pageTitle = "CV";
    let data = {};

    if(req.params.id){
        data = DB.find((v => v.id === parseInt(req.params.id)));
        if(data)
            return res.render("pages/cv.pug", { ...data });
        else 
            return res.redirect(`/?username=${res.locals.username}`);
    }
});
app.get("/about", setLocals, setQueryString, redirectToStart, (req, res) => {
    res.locals.pageTitle = "About";
    res.render("pages/about.pug");
});
app.get("/table", setLocals, setQueryString, redirectToStart, (req, res) => {
    res.locals.pageTitle = "Class Table";
    res.render("pages/table.pug");
});
app.use('/api/v1', apiRouter);
app.use('/error', errorRouter);

/* Server */
app.listen(port, () => console.log(`\nListening On: http://localhost:${port}\n\nMode: ${NODE_ENV}`));
