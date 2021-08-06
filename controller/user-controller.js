const user = require("../models/user");

exports.getAllUser = async (req, res) => {
  try {
    await user
      .find()
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
      Error: err,
    });
  }
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
