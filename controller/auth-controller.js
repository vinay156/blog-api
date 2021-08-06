const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const user = require("../models/user");

exports.login = async (req, res) => {
  let name = req.body.name;
  let pass = req.body.pass;
  let key = process.env.JWTSECRET;

  let tempUser = await user.findOne({ userName: name });
  if (!tempUser) {
    return res.json({
      err: "User dosent exist",
    });
  }

  let isAuth = await bcrypt.compare(pass, tempUser.password);
  if (isAuth) {
    let payLoad = {
      name: tempUser.userName,
      password: tempUser.password,
    };

    let token = await jwt.sign(payLoad, key);

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
  let name = req.body.name;
  let pass = req.body.pass;

  let tempUser = await user.findOne({ userName: name });
  if (tempUser) {
    return res.json({
      err: "User already Exists",
    });
  }

  pass = await bcrypt.hash(pass, 10);

  let newUser = new user({
    userName: name,
    password: pass,
  });

  await newUser.save((err) => {
    if (err) {
      return res.json({
        err: err,
      });
    }
  });
  res.json({
    success: "successfully signed up",
  });
};
