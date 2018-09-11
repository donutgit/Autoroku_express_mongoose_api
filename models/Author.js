const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema
const AuthorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  twitterHandle: {
    type: String,
    default: "https://twitter.com"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Author = mongoose.model("author", AuthorSchema);
