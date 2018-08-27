const express = require("express");
const router = express.Router();

//item model
const Vote = require("../models/Vote");

// @route GET api/items
// @desc Get all items
// @access Public
router.get("/", (req, res) => {
  Vote.find({}, (err, votes) => {
    if (err) {
      console.log(err);
    } else {
      res.render("votes", {
        title: "Vote list",
        votes: votes
      });
    }
  });
});

// @route  POST api/items
// @desc   Create a item
// @access Public
router.post("/", (req, res) => {
  const newItem = new Vote({
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    phone: req.body.phone,
    voteResult: req.body.voteResult
  });

  newItem.save().then(vote => res.json(vote));
});

// @route  DELETE api/items/:id
// @desc   Delete a item
// @access Public
router.delete("/:id", (req, res) => {
  Vote.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
