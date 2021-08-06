const posts = require("../models/posts");
const scripts = require("./scripts");
const user = require("../models/user");

exports.addPost = async (req, res) => {
  let newPost = new posts({
    title: req.body.title,
    desc: req.body.desc,
    userid: req.user._id,
  });
  let post = await newPost.save();
  post = post._id;

  let currUser = await user.findOneAndUpdate(
    { _id: req.user._id },
    { $push: { posts: post } }
  );

  res.json({
    success: "Post Added",
  });
};

exports.getUserPost = async (req, res) => {
  let currUser = await user.findOne({ _id: req.params.id }).populate("posts");
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
  let id = req.params.id;

  let isValid = scripts.isValidObjectId(id);
  if (!isValid) {
    return res.json({
      err: "Invalid id",
    });
  }

  let currPost = posts.findById(id).populate("userid", "userName");
  currPost.populate({
    path: "comments",
    populate: {
      path: "user",
      select: "userName",
    },
  });
  currPost = await currPost;

  res.json({
    success: "Success",
    data: currPost,
  });
};
