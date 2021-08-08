const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.login = async (req, res) => {
  const { userName, password } = req.body;
  const key = process.env.JWT_SECRET;

  const user = await User.findOne({ userName });
  if (!user) {
    return res.json({
      err: "User dosent exist",
    });
  }

  const isAuth = await bcrypt.compare(password, user.password);
  if (isAuth) {
    const payLoad = {
      userName,
      password,
    };

    const token = await jwt.sign(payLoad, key);

    res.json({
      success: "logged in",
      token,
      id: user._id,
    });
  } else {
    res.json({
      err: "Wrong Password",
    });
  }
};

exports.signUp = async (req, res) => {
  const { userName, password } = req.body;

  const user = await User.findOne({ userName });
  if (user) {
    return res.json({
      err: "User already Exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    userName,
    password: hashedPassword,
  });

  await newUser.save((err) => {
    if (err) {
      return res.json({
        err,
      });
    }
  });
  res.json({
    success: "successfully signed up",
    id: newUser._id,
  });
};
