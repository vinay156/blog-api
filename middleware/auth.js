const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.isAuthenticated = (req, res, next) => {
  const bearerHeaders = req.headers["authorization"];
  if (typeof bearerHeaders !== "undefined") {
    const token = bearerHeaders.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.json({
          err: "Invalid token : Login in ",
        });
      }

      const user = await User.findOne({ userName: decoded.name });

      if (!user) {
        return res.json({
          err: "Invalid User",
        });
      }
      req.user = user;
      next();
    });
  } else {
    return res.json({
      err: "Not logged in",
    });
  }
};
