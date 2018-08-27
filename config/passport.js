const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const config = require("../config/database");
const bcrypt = require("bcryptjs");

module.exports = function(passport) {
  //local strategy
  passport.use(
    new LocalStrategy((username, password, done) => {
      let query = { username: username };
      User.findOne(query, (err, user) => {
        if (err) throw err;
        if (!user) return done(null, false, { message: "no user found" });
        //match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) return done(null, user);
          else return done(null, false, { message: "wrong password" });
        });
      });
    })
  );

  passport.serializeUser(function(user, done) {
    // console.log('[SERIALIZE USER]', user.id)
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      // console.log('[DESERIALIZEUSER]', user)
      done(err, user);
    });
  });
};
