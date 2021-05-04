const express = require("express");
const router = express.Router();
import cors from "cors";

router.use(cors());
router.get("/", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
});

module.exports = router;