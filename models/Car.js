const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema
const CarSchema = new Schema({
  mark: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  nominations: [String],
  premium: {
    type: Boolean,
    default: false
  },
  votes: {
    type: Number,
    default: 420
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Car = mongoose.model("car", CarSchema);