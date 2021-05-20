export const authenticate = (req, res, next) => {
    if(!req.session.loggedIn){
        res.json({ ok:false, error: "You are not logged in." })
    }
    next();
}