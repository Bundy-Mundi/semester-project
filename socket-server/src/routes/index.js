const express = require("express");
const router = express.Router();
import cors from "cors";
import User from "../mongodb/user";
import bodyParser from "body-parser"

router.use(cors());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.get("/", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
});
router.post("/user/new", async(req, res) => {
  const { body:{ username } } = req;
  const user = await User.createUser({username});
  res.send(user);
});
router.post("/user/login", async(req, res) => {
  const { body:{ username } } = req;
  const user = await User.login({username});
  console.log(user)
  res.send(user);
});
router.get("/user/check", async(req, res) => {
  const { query:{ id, username } } = req;
  const { ok, message } = await User.userMatch({ id, username });
  res.send({ ok, message });
});
module.exports = router;