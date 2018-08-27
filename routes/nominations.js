const express = require("express");
const router = express.Router();

//item model
const Nomination = require("../models/Nomination");

// @route GET /nominations
// @desc render nominations view
// @access Public
router.get("/", (req, res) => {
  Nomination.find({}, (err, nominations) => {
    if (err) {
      console.log(err);
    } else {
      res.render("nominations", {
        title: "Nominations",
        nominations: nominations
      });
    }
  });
});

module.exports = router;
