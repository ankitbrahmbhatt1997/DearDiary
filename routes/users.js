const express = require("express");
const mongoose = require("mongoose");
const _ = require("lodash");
const passport = require("passport");

const router = express.Router();

//custom files
const { User } = require("../models/User");

// User Login Route
router.get("/login", (req, res) => {
  res.render("users/login");
});

// User Register Route
router.get("/register", (req, res) => {
  res.render("users/register");
});

//post request for logging in
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/ideas",
    failureRedirect: "/users/login",
    failureFlash: true
  })(req, res, next);
});

//post request for Registering a user
router.post("/register", (req, res) => {
  let errors = [];
  if (req.body.password !== req.body.password2) {
    errors.push("Passwords do not match");
  }
  if (req.body.password.length < 4) {
    errors.push("Passwords must be of atleast 4 characters");
  }
  if (errors.length > 0) {
    res.render("users/register", {
      errors,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      password2: req.body.password2
    });
  } else {
    User.findOne({
      email: req.body.email
    }).then(user => {
      if (user) {
        res.redirect("/users/register");
      } else {
        let body = _.pick(req.body, ["name", "email", "password"]);
        new User(body)
          .save()
          .then(user => {
            res.redirect("/users/login");
          })
          .catch(e => {
            console.log(e);
            return;
          });
      }
    });
  }
});

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged Out");
  res.redirect("/users/login");
});

module.exports = router;
