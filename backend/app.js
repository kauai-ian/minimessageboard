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
const MongoStore = require("connect-mongo"); // session support

// routes
const indexRouter = require("./routes/index.routes");
const authRouter = require("./routes/auth.routes");
const usersRouter = require("./routes/users.routes");

// view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");

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

// session middleware
app.use(
  session({
    secret: "baby manoa",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.DB_URI,
      collectionName: "sessions",
      dbName: "messageBoard",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      httpOnly: false,
    },
  })
);

//passport middleware
app.use(passport.authenticate("session"));

// Serve static files from the React build directory
// app.use(express.static(path.join(__dirname, "../client/src")));


// mount api routes
app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/users", usersRouter);

// Catch-all route to serve the React app
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
// });

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
