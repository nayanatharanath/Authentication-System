const express = require("express");
const { signup } = require("../controller/controller");
const route = express.Router();

route.post("/signup", signup);

module.exports = route;
