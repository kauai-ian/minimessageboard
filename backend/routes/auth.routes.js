// auth.routes.js
const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User"); // requires the model with Passport-Local Mongoose plugged in
const {  handleSignup, handleLogin, handleLogout } = require("../controller/auth.controller");
const verifyBody = require("../middleware/auth.middleware")

//verify correct. Behind the scences configures localstrategy to fetch the user record from the app db and verify the hashed pw against the pw submitted. If success then user authenticated.
passport.use(User.createStrategy());

//session support behind the scenes configure to persist user info after login
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.post("/login", verifyBody, handleLogin);
router.post("/logout",handleLogout);
router.post("/signup", verifyBody, handleSignup);


module.exports = router;
