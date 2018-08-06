const express = require("express");
const router = express.Router();

//item model
const Nomination = require("../../models/Nomination");

// @route GET api/items
// @desc Get all items
// @access Public
router.get("/", (req, res) => {
  Nomination.find()
    .sort({ nomination: "asc" })
    .then(nominations => res.json(nominations));
});

// @route  POST api/items
// @desc   Create a item
// @access Public
router.post("/", (req, res) => {
  console.log(req);
  const newItem = new Nomination({
    nomination: req.body.nomination
  });

  newItem.save().then(nom => res.json(nom));
});

// @route  DELETE api/items/:id
// @desc   Delete a item
// @access Public
router.delete("/:id", (req, res) => {
  Nomination.findById(req.params.id)
    .then(nom => nom.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
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

// router.put('/:id', (req, res) => {
//   const modelId = req.params.id;
//   const newNom = req.body.nomination;

//   Nomination.findById(modelId).then((model) => {
//       return Object.assign(model, {nomination: newNom});
//   }).then((model) => {
//       return model.save();
//   }).then((updatedModel) => {
//       res.json({
//           msg: 'model updated',
//           updatedModel
//       });
//   }).catch((err) => {
//       res.send(err);
//   });
// });

module.exports = router;
