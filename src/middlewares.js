require('dotenv').config();

export const setLocals = (req, res, next) => {
    res.locals.siteName = process.env.SITE_NAME || "Sample";
    next();
};

export const setQueryString = (req, res, next) => {
    const { loginFailed } = req.query;
    res.locals.loginFailed = loginFailed;
    next();
};
