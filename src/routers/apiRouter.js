import express from "express";
import { DB } from "../db";
const apiRouter = express.Router();

// GET /api/v1/
apiRouter.get('/', (req, res) => {
    res.send("API HOME");
});
apiRouter.get('/profiles', (req, res) => {
    res.json(DB);
});
apiRouter.post('/', (req, res) => {
    const { body } = req;
    if(body){
        
    }
});

export default apiRouter;