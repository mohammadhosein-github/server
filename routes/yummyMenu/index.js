const express = require("express");
const route = express.Router();

const getMenu = require("./getMenu");
const registerMenu = require("./registerMenu");

route.get("/menu/:restaurantName", getMenu);
route.post("/", registerMenu);

module.exports = route;
