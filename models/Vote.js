const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema
const VoteSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  voteResult: {
    SmallClass: { type: String, default: "BMW" },
    Economy: { type: String, default: "BMW" }
    // Compact: { type: String, default: "BMW" },
    // Buisness: { type: String, default: "BMW" },
    // Lux: { type: String, default: "BMW" },
    // CoupeSport: { type: String, default: "BMW" },
    // ElectricHybrid: { type: String, default: "BMW" },
    // Crossover: { type: String, default: "BMW" }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Vote = mongoose.model("vote", VoteSchema);
