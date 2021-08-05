const user = require("../models/user");

exports.getCurrentUser = async (req, res) => {
  let currUser = {
    success: "Success",
    data: {
      username: req.user.userName,
      id: req.user._id,
    },
  };
  res.json(currUser);
};

exports.getUser = async (req, res) => {
  let id = req.params.id;
  let currUser = await user.findOne({ _id: id });

  if (!currUser) {
    return res.json({
      err: "user dosent exist",
    });
  }

  let resUser = {
    username: currUser.userName,
    posts: currUser.posts,
  };
  res.json(resUser);
};
