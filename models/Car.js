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
    index: { unique: true },
    required: true
  },
  nominations: [String],
  imageUrl: {
    type: String,
    default:
      "https://res.cloudinary.com/dxfogjj18/image/upload/v1534421906/pkp1db9osg2qgqcoe0a6.png"
  },
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
