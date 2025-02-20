import express from "express";
import User from "../model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email: email });
    if (checkUser) {
      throw new Error("user already exists");
    } else {
      const hashedPass = await bcrypt.hash(password, 10);

      const user = new User({
        name,
        email,
        password: hashedPass,
      });
      await user.save();
      res.send("user created successfully");
    }
  } catch (error) {
    res.status(400).send("Error in SignUp " + error.message);
  }
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const isUser = await User.findOne({ email: email });
    if (!isUser) {
      throw new Error("invalid email or password");
    } else {
      const check = await bcrypt.compare(password, isUser.password);
      if (check) {
        const token = jwt.sign({ _id: isUser._id }, process.env.KEY, {
          expiresIn: "1h",
        });
        
        res.cookie("token", token);
        res.send(isUser);
      } else {
        throw new Error("invalid email or password");
      }
    }
  } catch (error) {
    res.status(400).send("login error " + error.message);
  }
});

authRouter.post("/logout", (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.send("logged out");
});

export { authRouter };
