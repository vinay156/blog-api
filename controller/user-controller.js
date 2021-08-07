const User = require("../models/user");

exports.getAllUser = async (req, res) => {
  try {
    await User.find()
      .populate("posts")
      .then((users) => {
        if (users.length === 0) {
          res.status(404).json({
            msg: "No Users found",
          });
        }
        res.json(users);
      });
  } catch (err) {
    res.status(500).json({
      err,
    });
  }
};

exports.getUser = async (req, res) => {
  const id = req.params.id;
  const currUser = await User.findOne({ _id: id });

  if (!currUser) {
    return res.json({
      err: "user dosent exist",
    });
  }

  const resUser = {
    username: currUser.userName,
    posts: currUser.posts,
  };
  res.json(resUser);
};
