const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const compression = require("compression");

const app = express();

const env = require("./environment.json");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "PUT,GET,POST,DELETE,PATCH");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(require("./routes"));

//Express Error Handling
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  return res.status(status).json({ message: message });
});

//connect to database
mongoose.connect(env.MONGOURI, () => {
  app.listen(process.env.PORT || 4000);
  console.log("Database Connected");
}); //mongodb://127.0.0.1:27017
const db = mongoose.connection;

db.on("error", console.error.bind(console, "Mongodb connection error:"));
