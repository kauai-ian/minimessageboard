require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");
const connectDb = require("./db");
const cors = require("cors");

const indexRouter = require("./routes/index");

const app = express();

app.use(logger("dev"));
app.use(cors({ origin: "http://localhost:5173" })); // allow operation from a different port
app.use(express.json()); // parse incoming json data
app.use(express.urlencoded({ extended: false })); // parse form data

app.use("/", indexRouter);
// app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

connectDb();

module.exports = app;
