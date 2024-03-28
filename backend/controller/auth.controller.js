// authentication and authorization logic
const passport = require("passport");
const User = requrie("../models/User");

//handle login takes in a request, authenticates user vs db username, logs in or error.
exports.login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).send("Invalid username");
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.redirect("/");
    });
  })(req, res, next); // invokes the next middlware function in the stack once authentication is complete
};

// handle user logout
exports.logout = async (req, res) => {
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
exports.signup = async (req, res, next) => {
  const { username, password } = req.body;
  try {
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
