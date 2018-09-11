const express = require("express");
const router = express.Router();
// const jwt = require("express-jwt");
// const secret = require("../../config/database").jwtSecret;
// model
const Nomination = require("../../models/Nomination");

// @route GET api/nominations
// @desc render nominations view
// @access Public
router.get("/", (req, res) => {
  require("../../models/Nomination")
    .find()
    .sort({ date: -1 })
    .then(nominations => res.json(nominations));
});

// @route  POST api/items
// @desc   add nomination
// @access Public
router.post("/", (req, res) => {
  console.log(req.body.name);
  const newItem = new Nomination({
    name: req.body.name
  });

  newItem.save().then(nom => res.send({ success: true }));
  // res.send({ success: true });
});

// @route  DELETE api/nominations/:id
// @desc   Delete a item
// @access Public
router.delete("/:id", (req, res) => {
  console.log(req.body);
  Nomination.findById(req.params.id)
    .then(nom =>
      nom.remove().then(() => {
        res.send({ success: true });
      })
    )
    .catch(err => console.log(err));
});

// @route  UPDATE api/items/:id
// @desc   UPDAte a item
// @access Public
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const update = {
    nomination: req.body.nomination
  };

  Nomination.findByIdAndUpdate(id, update, { new: true }).then(model => {
    res.json({
      msg: "nomination updated",
      model
    });
  });
});

module.exports = router;
