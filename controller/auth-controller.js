const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.login = async (req, res) => {
  const name = req.body.name;
  const pass = req.body.pass;
  const key = process.env.JWT_SECRET;

  const tempUser = await User.findOne({ userName: name });
  if (!tempUser) {
    return res.json({
      err: "User dosent exist",
    });
  }

  const isAuth = await bcrypt.compare(pass, tempUser.password);
  if (isAuth) {
    const payLoad = {
      name: tempUser.userName,
      password: tempUser.password,
    };

    const token = await jwt.sign(payLoad, key);

    res.json({
      success: "logged in",
      token: token,
    });
  } else {
    res.json({
      err: "Wrong Password",
    });
  }
};

exports.signUp = async (req, res) => {
  const name = req.body.name;
  let pass = req.body.pass;

  const tempUser = await User.findOne({ userName: name });
  if (tempUser) {
    return res.json({
      err: "User already Exists",
    });
  }

  pass = await bcrypt.hash(pass, 10);

  const newUser = new User({
    userName: name,
    password: pass,
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
  });
};
