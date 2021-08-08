const Comment = require("../models/comment");
const Posts = require("../models/posts");
const scripts = require("./scripts");

exports.addComment = async (req, res) => {
  const { description } = req.body;
  const userId = req.user._id;
  const postId = req.params.idd;
  const isValid = scripts.isValidObjectId(postId);
  if (!isValid) {
    return res.json({
      err: "Invalid Id",
    });
  }

  let comment = new Comment({
    description,
    user: userId,
    post: postId,
  });

  comment = await comment.save();

  const post = await Posts.findByIdAndUpdate(postId, {
    $push: { comments: comment._id },
  });

  res.json({
    userId,
    postId,
    commentId: comment._id,
    success: "Success.....",
  });
};
