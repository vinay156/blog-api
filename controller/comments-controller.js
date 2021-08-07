const Comment = require("../models/comment");
const Posts = require("../models/posts");
const Scripts = require("./scripts");

exports.addComment = async (req, res) => {
  const id = req.params.postId;
  const isValid = Scripts.isValidObjectId(id);
  if (!isValid) {
    return res.json({
      err: "Invalid Id",
    });
  }

  let newComment = new Comment({
    desc: req.body.desc,
    user: req.user._id,
  });

  newComment = await newComment.save();

  const currPost = await Posts.findByIdAndUpdate(id, {
    $push: { comments: newComment._id },
  });

  res.json({
    success: "Success.....",
  });
};
