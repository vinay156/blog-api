const Comment = require("../models/comment");
const Posts = require("../models/posts");
const scripts = require("./scripts");

exports.addComment = async (req, res) => {
  const { desc } = req.body;
  const userId = req.user._id;
  const postId = req.params.postId;
  const isValid = scripts.isValidObjectId(postId);
  if (!isValid) {
    return res.json({
      err: "Invalid Id",
    });
  }

  let newComment = new Comment({
    desc: desc,
    user: userId,
    post: postId,
  });

  newComment = await newComment.save();

  const currPost = await Posts.findByIdAndUpdate(postId, {
    $push: { comments: newComment._id },
  });

  res.json({
    success: "Success.....",
  });
};
