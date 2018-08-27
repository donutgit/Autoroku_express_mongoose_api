const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const authCheck = require("../../middleware/auth-check");

// @route GET user
// @desc Get users
// @access Public
router.get("/", authCheck, (req, res) => {
  console.log(req.user);
  User.find().then(users => res.json(users));
});

// @route  DELETE api/users/:id
// @desc   Delete a user
// @access Public
router.delete("/:id", (req, res) => {
  User.findById(req.params.id)
    .then(user =>
      user.remove().then(() => {
        res.send({ success: true });
      })
    )
    .catch(err => console.log(err));
});

module.exports = router;
