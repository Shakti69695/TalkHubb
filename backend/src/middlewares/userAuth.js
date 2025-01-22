const jwt = require("jsonwebtoken");
const User = require("../model/user");

userLogin = async (req, res, next) => {
  const { token } = req.cookies;

  try {
    if (!token) {
      throw new Error("No token exist");
    }
    const verifyToken = await jwt.verify(token, process.env.KEY);
    const { _id } = verifyToken;
    if (!verifyToken) {
      throw new Error("Invalid token");
    } else {
      const user = await User.findById(_id);
      req.user = user;
      next();
    }
  } catch (error) {
    res.status(400).send("Error " + error.message);
  }
};

module.exports = { userLogin };
