const express = require("express");
const route = express.Router();

route.get("/", (req, res) => {
  res.send("source architect...");
});

module.exports = route;
