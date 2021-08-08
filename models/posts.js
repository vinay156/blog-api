const mongoose = require("mongoose");

let Post = new mongoose.Schema({
  title: String,
  description: String,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", Post);
