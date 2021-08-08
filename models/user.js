const mongoose = require("mongoose");

let User = new mongoose.Schema({
  userName: String,
  password: String,
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
});

module.exports = mongoose.model("User", User);
