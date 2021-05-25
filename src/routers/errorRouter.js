import express from "express";
const errorRouter = express.Router();

errorRouter.get("/403", (req, res) => {
    res.render("403.pug");
});
errorRouter.get("/404", (req, res) => {
    res.render("404.pug");
});

export default errorRouter;