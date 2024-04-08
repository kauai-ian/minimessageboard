// app.js
require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const app = express();
const path = require("path");
const connectdb = require('./db')
const logger = require("morgan");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
var cookieParser = require('cookie-parser')
const MongoStore = require("connect-mongo"); // session support

// routes
const messageRouter = require("./routes/message.routes");
const authRouter = require("./routes/auth.routes");
const usersRouter = require("./routes/users.routes");

app.use(logger("dev"));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
); // allow operation from a different port
app.use(express.json()); // parse incoming json data
app.use(express.urlencoded({ extended: false })); // parse form data

// database connect
connectdb()

// cookie parse middleware
app.use(cookieParser())

// session middleware
app.use(
  session({
    secret: 'babycakes',
    name: 'user-cookie', // TODO: so does this need to be a seperate cookie that stores the session information? And then the front end would set the information in a different cookie for the 
    resave: false,
    httpOnly: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.DB_URI,
      collectionName: "sessions",
      dbName: "messageBoard",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      httpOnly: false,
      name: 'user-cookie'
    },
  })
);

//passport middleware
app.use(passport.authenticate("session"));

// mount api routes
app.use("/messages", messageRouter);
app.use("/auth", authRouter);
app.use("/users", usersRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

module.exports = app;
