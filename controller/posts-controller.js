const Posts = require("../models/posts");
const scripts = require("./scripts");
const User = require("../models/user");

exports.addPost = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user._id;
  const post = new Posts({
    title,
    description,
    user: userId,
  });
  const postSave = await post.save();
  const postId = postSave._id;

  const user = await User.findOneAndUpdate(
    { _id: userId },
    { $push: { posts: postId } }
  );

  res.json({
    postId,
    userId,
    success: "Post Added",
  });
};

exports.getSinglePost = async (req, res) => {
  const postId = req.params.id;

  const isValid = scripts.isValidObjectId(postId);
  if (!isValid) {
    return res.json({
      err: "Invalid id",
    });
  }

  const post = await Posts.findById(postId)
    .populate("userid", "userName")
    .populate({
      path: "comments",
      populate: {
        path: "user",
        select: "userName",
      },
    });

  res.json({
    success: "Success",
    postId,
    data: post,
  });
};
