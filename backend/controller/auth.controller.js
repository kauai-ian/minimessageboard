// auth.controller.js authentication and authorization logic
const passport = require("passport");
const User = require("../models/User");
const response = require("../helpers/response");

//handle login takes in a request, authenticates user vs db username, logs in or error.
exports.handleLogin = async (req, res, next) => {
  console.log("logging in user", { body: req.body, username: req.body.username });
  try {
    passport.authenticate("local", (err, username, info) => {
      if (err) {
        throw new Error(err.message);
      }
      if (!username) return res.status(401).send("Invalid username");
      req.login(username, (err) => {
        if (err) {
          throw new Error(err.message);
        }
        return response({
          res,
          status: 200,
          message: "logged in",
          data: username,
        });
      });
    })(req, res, next); // invokes the next middlware function in the stack once authentication is complete
  } catch (err) {
    next(err);
  }
};

// handle user logout
exports.handleLogout = async (req, res, next) => {
  try {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/messages/");
    })
  } catch (err) {
    next(err);
  }
};


// handle user signup
exports.handleSignup = async (req, res, next) => {
  console.log("registering user", {
    body: req.body,
    username: req.body.username,
  });
  const { username, password } = req.body;
  try {
    // validate username & password
    if (!username || !password) {
      throw new Error("username & password are required");
    }
    // create a new username and password then login user
    User.register(new User({ username }), password, (err, username) => {
      console.log("User has been registered and created", { username, err });
      if (err) {
        next(err);
      }
      // login the user (its a function so it can persist through the session)
      req.login(username, async (err) => {
        if (err) {
          next(err);
        }
        return response({
          res,
          status: 200,
          message: "logged in",
          data: username,
        });
      });
    });
  } catch (err) {
    next(err);
  }
};

// middleware checks if user is authenticated else redirect
exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};
