const mongoose = require("mongoose");

let Post = new mongoose.Schema({
  title: String,
  description: String,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("post", Post);
