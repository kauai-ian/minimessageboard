// auth.controller.js authentication and authorization logic
const passport = require("passport");
const User = require("../models/User");

//handle login takes in a request, authenticates user vs db username, logs in or error.
exports.handleLogin = async (req, res, next) => {
  console.log("logging in user", { body: req.body, user: req.user });
  try {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        throw new Error(err.message);
      }
      if (!user) return res.status(401).send("Invalid username");
      req.login(user, (err) => {
        if (err) {
          throw new Error(err.message);
        }
         res.status(200).json({user});
      });
    })(req, res, next); // invokes the next middlware function in the stack once authentication is complete
  } catch (err) {
    next(err);
  }
};

// handle user logout
exports.handleLogout = async (req, res) => {
  try {
    req.logout();
    res.redirect("/");
  } catch (err) {
    next(err);
  }
};

// render signup form
exports.signupForm = (req, res) => {
  res.render("signup");
};

// handle user signup
exports.handleSignup = async (req, res, next) => {
  console.log("registering user", {
    body: req.body,
    user: req.user,
  });
  const { username, password } = req.body;
  try {
    if (err) {
      throw new Error(err.message);
    }
    // validate username & password
    if (!username || !password) {
      throw new Error("username & password are required");
    }
    // create a new user
    const user = new User({ username });
    await User.register(user, password);
    // login the user (its a function so it can persist through the session)
    passport.authenticate("local")(req, res, () => {
      res.redirect("/");
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
