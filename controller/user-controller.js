const User = require("../models/user");

exports.getUser = async (req, res) => {
  const userId = req.params.id;

  const user = await User.findOne({ _id: userId });
  if (!user) {
    return res.json({
      err: "user dosent exist",
    });
  }

  const resUser = {
    userId,
    userName: user.userName,
    posts: user.posts,
  };
  res.json(resUser);
};

exports.getUserPost = async (req, res) => {
  const userId = req.params.id;
  const user = await User.findOne({ _id: userId }).populate("posts");
  if (!user) {
    return res.json({
      err: "User dosent exist",
    });
  }

  res.json({
    success: "Success",
    userId,
    data: user.posts,
  });
};
