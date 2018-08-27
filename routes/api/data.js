const express = require("express");
const router = express.Router();
// const mongoose = require("mongoose");

// models
// const Nomination = require("../../models/Nomination");
// const Car = require("../../models/Car");
// const Votes = require("../../models/Vote");

// @route GET cars
// @desc Get all cars
// @access Public
// router.get("/", (req, res) => {
//   Promise.all([Nomination.find(), Car.find(), Vote.find()]).then(
//     ([nom, cars, votes]) => {
//       res.json([nom, cars, votes]);
//     }
//   );
// });

router.get("/", (req, res) => {
  const models = req.query.data.split(",");
  Promise.all(
    models.map(model => {
      try {
        return require(`../../models/${model}`).find();
      } catch (error) {
        res.send({ Error: `there is no '${model}' module` });
      }
    })
  ).then(([nominations, cars, votes]) => {
    return res.json([
      {
        nominations: nominations,
        cars: cars,
        votes: votes
      }
    ]);
  });
});


module.exports = router;
