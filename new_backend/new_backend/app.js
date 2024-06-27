const express = require("express");
const cors = require("cors");
const dbConnection = require("./config/dbConnection");
const routes = require("./routes");
console.log(routes,"routes==========")

// declare a new express app
var app = express();

// enable cors
app.use(cors());
// app.options('*', cors());

app.use(express.json());

// Static Files
app.use(express.static("public"));

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

app.use(routes);

module.exports = app;
