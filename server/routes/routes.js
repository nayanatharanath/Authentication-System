const express = require("express");
const { signup } = require("../controller/controller");
const route = express.Router();

route.get("/", signup);

module.exports = route;
