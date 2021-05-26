require('dotenv').config();

export const setLocals = (req, res, next) => {
    res.locals.siteName = process.env.SITE_NAME || "Sample";
    next();
};

export const setQueryString = (req, res, next) => {
    const { username } = req.query;
    if(username)
        res.locals.username = username;
    next();
};

export const redirectToStart = (req, res, next) => {
    const { username } = req.query;
    if(username)next();
    else res.redirect("/");
};
