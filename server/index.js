// import required packages
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config();

// auth routes
const route = require("./routes/routes");

// Database connection
mongoose
  .connect(process.env.DATABASE, {})
  .then(() => console.log("DB Connected"))
  .catch((error) => `DB error: ${error}`);

// app middlewares
app.use(bodyParser.json());

if ((process.env.NODE_ENV = "development")) {
  app.use(cors({ origin: `http://localhost:3000` }));
}

// middleware
app.use("/api", route);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log("I am listening");
});
