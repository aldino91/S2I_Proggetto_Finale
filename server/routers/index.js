const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ messagge: "funziona" });
});

module.exports = router;
