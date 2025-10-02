const express = require("express");
const route = express.Router();

const signUp = require("../controller/controller");

const { validateUserSignUp } = require("../validator/auth.js");
const { runValidateUserSignUp } = require("../validator/index.js");

route.post("/signup", validateUserSignUp, runValidateUserSignUp, signUp);

module.exports = route;
