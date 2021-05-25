import express from "express";
const apiRouter = express.Router();

// GET /api/v1/
apiRouter.get('/', (req, res) => {
    res.send("API HOME");
});

export default apiRouter;