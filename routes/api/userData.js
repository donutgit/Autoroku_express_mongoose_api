const express = require("express");
const router = express.Router();
const User = require("mongoose").model("user");
const secret = require("../../config/database").jwtSecret;
const jwt = require("jsonwebtoken");

// @route GET user data from auth-check
// @desc Get users
// @access Public
router.get("/", (req, res) => {
  if (!req.headers.authorization) {
    return res.json({ authorization: false });
  }

  // get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authorization.split(" ")[1];

  // decode the token using a secret key-phrase
  return jwt.verify(token, secret, (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err) {
      return res.json({ authorization: false });
    }

    const userId = decoded.sub;

    // check if a user exists
    return User.findById(userId, (userErr, user) => {
      if (userErr || !user) {
        return res.json({ user: false });
      }
      //send user data
      res.json({ user: user });
    });
  });
});

module.exports = router;
