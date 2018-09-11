const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema
const VoteSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    index: { unique: true }
  },
  phone: {
    type: Number,
    required: true,
    index: { unique: true }
  },
  voteResult: {
    type: Object,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Vote = mongoose.model("vote", VoteSchema);
