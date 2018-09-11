const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema
const NominationSchema = new Schema({
  name: {
    type: String,
    index: { unique: true },
    required: true
  }
});

module.exports = Nomination = mongoose.model("nomination", NominationSchema);