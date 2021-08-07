const Posts = require("../models/posts");
const Scripts = require("./scripts");
const User = require("../models/user");

exports.addPost = async (req, res) => {
  const { title, desc } = req.body;
  const userId = req.user._id;
  const newPost = new Posts({
    title: title,
    desc: desc,
    userid: userId,
  });
  const post = await newPost.save();
  const postId = post._id;

  const currUser = await User.findOneAndUpdate(
    { _id: userId },
    { $push: { posts: postId } }
  );

  res.json({
    success: "Post Added",
  });
};

exports.getUserPost = async (req, res) => {
  const currUser = await User.findOne({ _id: req.params.id }).populate("posts");
  if (!currUser) {
    return res.json({
      err: "User dosent exist",
    });
  }

  res.json({
    success: "Success",
    data: currUser.posts,
  });
};

exports.getSinglePost = async (req, res) => {
  const id = req.params.id;

  const isValid = Scripts.isValidObjectId(id);
  if (!isValid) {
    return res.json({
      err: "Invalid id",
    });
  }

  const currPost = await Posts.findById(id)
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
    data: currPost,
  });
};
