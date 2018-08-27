const express = require("express");
const router = express.Router();

//item model
const Car = require("../models/Car");

// @route GET cars
// @desc Get all cars
// @access Public
router.get("/", (req, res) => {
  Car.find({}, (err, cars) => {
    if (err) {
      console.log(err);
    } else {
      res.render("cars", {
        title: "Cars",
        cars: cars
      });
    }
  });
});
// @route GET api/car
// @desc Get all car
// @access Public
// router.get("/api", (req, res) => {
//   Car.find()
// });
// @route GET api/cars/add
// @desc add new car
// @access Public
router.get("/add", (req, res) => {
  res.render("addCarForm", {
    title: "Add new car"
  });
});
// @route GET api/cars/:id
// @desc edit car data
// @access Public
router.get("/:id", (req, res) => {
  Car.findById(req.params.id).then(car => {
    res.render("editCarForm", {
      title: `Edit ${car.mark} ${car.model}`,
      car: car
    });
  });
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
