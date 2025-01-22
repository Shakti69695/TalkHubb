const express = require("express");
const { userLogin } = require("../middlewares/userAuth");
const User = require("../model/user");
const userRouter = express.Router();

userRouter.get("/users", userLogin, async (req, res) => {
  const loggedInUser = req.user._id;

  try {
    const users = await User.find({ _id: { $ne: loggedInUser } });
    res.send(users);
  } catch (error) {
    res.status(400).send("Error " + error.message);
  }
});

userRouter.get("/user", userLogin, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(400).send("error : " + error.message);
  }
});

userRouter.patch("/update", userLogin, async (req, res) => {
  const id = req.user.id;
  const { name, photoUrl } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { name: name, photoUrl: photoUrl },
      {
        returnDocument: "after",
      }
    );
    res.send(user);
  } catch (error) {
    res.status(400).send("Error " + error.message);
  }
});

module.exports = { userRouter };
