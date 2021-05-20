const express = require("express");
const router = express.Router();
import User from "../mongodb/user";
import bodyParser from "body-parser"

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.get("/", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
});
router.post("/user/new", async(req, res) => {
  const { body:{ username, address } } = req;
  const user = await User.createUser({ username, address });
  res.json(user);
});
router.post("/user/login", async(req, res) => {
  const { body:{ username, address } } = req;
  const { error, user } = await User.login({username, address});
  res.json({error, user});
});
router.get("/user/check", async(req, res) => {
  const { query:{ id, username } } = req;
  const { ok, message } = await User.userMatch({ id, username });
  res.json({ ok, message });
});
module.exports = router;