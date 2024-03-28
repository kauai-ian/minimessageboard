// auth.js
const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User"); // requires the model with Passport-Local Mongoose plugged in

//verify correct. Behind the scences configures localstrategy to fetch the user record from the app db and verify the hashed pw against the pw submitted. If success then user authenticated.
passport.use(User.createStrategy());

//session support behind the scenes configure to persist user info after login
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// add route that will authenticate the user when they submit the form.
router.post(
  "/login/password",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);
//logout redirects to home
router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});
//signup page render
router.get("/signup", function (req, res, next) {
  res.render("signup");
});

// handle form submission . This route creates a new user record in the app's database, storing the username and hashed password. Once the record is created, the user is logged in.
router.post("/signup", async (req, res, next) => {
    try {
        const { username, password} = req.body;
        await User.register(new User({username,}), password)
        res.redirect('/')
    } catch (err) {
        next(err)
    }
});

//create the page
router.get("/login", function (req, res, next) {
  res.render("login");
});

module.exports = router;
