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
    let template = "pages/start.pug";
    res.locals.pageTitle = "Home";
    if(res.locals.username)
        template = "pages/home.pug";
    res.render(template);
});
app.get("/cv", setLocals, setQueryString, redirectToStart, (req, res) => {
    res.locals.pageTitle = "CV";
    res.render("pages/cv.pug", { data: DB });
});
app.get("/about", setLocals, setQueryString, redirectToStart, (req, res) => {
    res.locals.pageTitle = "About";
    res.render("pages/about.pug");
});
app.use('/api/v1', apiRouter);
app.use('/error', errorRouter);

/* Server */
app.listen(port, () => console.log(`\nListening On: http://localhost:${port}\n\nMode: ${NODE_ENV}`));
