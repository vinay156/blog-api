const mongoose = require("mongoose");

let Comment = new mongoose.Schema({
  description: String,
  date: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "post" },
});

module.exports = mongoose.model("comment", Comment);
