const express = require("express");
const router = express.Router();

//item model
const Car = require("../../models/Car");

// @route GET api/car
// @desc Get all car
// @access Public
router.get("/", (req, res) => {
  Car.find()
    .sort({ date: -1 })
    .then(cars => res.json(cars));
});

// @route  POST api/car
// @desc   Create a car
// @access Public
router.post("/", (req, res) => {
  const newItem = new Car({
    mark: req.body.mark,
    model: req.body.model,
    nominations: req.body.nominations,
    premium: req.body.premium,
    votes: req.body.votes
  });

  newItem.save().then(car => res.json(car));
});

// @route  DELETE api/cars/:id
// @desc   Delete a car
// @access Public
router.delete("/:id", (req, res) => {
  Car.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

// @route  UPDATE api/cars/:id
// @desc   UPDAte a car
// @access Public
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const update = {
    ...req.body
  };
  Car.findByIdAndUpdate(id, update, { new: true }).then(model => {
    res.json({
      msg: "car updated",
      model
    });
  });
});

module.exports = router;
