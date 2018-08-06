const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema
const NominationSchema = new Schema({
  nomination: {
    type: String,
    required: true
  }
});

module.exports = Nomination = mongoose.model("nomination", NominationSchema);