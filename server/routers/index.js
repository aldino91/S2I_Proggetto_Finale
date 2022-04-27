const express = require("express");
const router = express.Router();

const AuthControlles = require("../controlles/AuthControlles");

router.get("/", (req, res) => {
  res.json({ messagge: "funziona" });
});

router.post("/login", AuthControlles.singIn);

router.post("/register", AuthControlles.singUp);


module.exports = router;
