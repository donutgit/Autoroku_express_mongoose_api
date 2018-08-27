const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../models/User");

// @route GET user
// @desc Get users
// @access Public
router.get("/", (req, res) => {
  User.find().then(users => res.json(users));
});

// @route GET user/register
// @desc Get register view
// @access Public
router.get("/register", (req, res) => {
  res.render("register");
});

// @route  POST user/register
// @desc   Send form data
// @access Public
router.post("/register", (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });
  // encrypt password
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) {
        console.log(err);
      }
      newUser.password = hash;
      newUser
        .save()
        .then(user => console.log(`user ---${user.name}--- was created`))
        .then(() => res.redirect("/users/login"));
    });
  });
});

// @route  GET user/login
// @desc   Get login view
// @access Public
router.get("/login", (req, res) => {
  res.render("login");
});
// @route  POST user/login
// @desc   login request
// @access Public
router.post("/login", (req, res, next) => {
  // passport.authenticate("local", {
  //   successRedirect: "/",
  //   failureRedirect: "/users/login",
  //   failureFlash: false
  // })(req, res, next);

  return passport.authenticate("local", (err, token, userData) => {
    if (err) {
      console.log(err);
    }
    return res.json({
      success: true,
      message: "You have successfully logged in!",
      token,
      user: userData
    });
  })(req, res, next);

});
// @route  GET user/logout
// @desc   login request
// @access Public
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
