const User = require("mongoose").model("user");
const PassportLocalStrategy = require("passport-local").Strategy;

/**
 * Return the Passport Local Strategy object.
 */
module.exports = new PassportLocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
    session: false,
    passReqToCallback: true
  },
  (req, email, password, done) => {
    const userData = {
      email: email,
      password: password,
      username: req.body.username
    };
    const newUser = new User(userData);
    newUser.save(err => {
      if (err) {
        return done(err);
      }

      return done(null);
    });
  }
);
