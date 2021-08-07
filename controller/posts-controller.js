const Posts = require("../models/posts");
const Scripts = require("./scripts");
const User = require("../models/user");

exports.addPost = async (req, res) => {
  const newPost = new Posts({
    title: req.body.title,
    desc: req.body.desc,
    userid: req.user._id,
  });
  let post = await newPost.save();
  post = post._id;

  const currUser = await User.findOneAndUpdate(
    { _id: req.user._id },
    { $push: { posts: post } }
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
