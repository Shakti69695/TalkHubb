const mongoose = require("mongoose");
const validator = require("validator");

const userScheme = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email");
        }
      },
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "others"],
        message: `{value} is not a valid gender type`,
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Weak password" + value);
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://i.pinimg.com/originals/91/2c/e1/912ce19bfeadb1e9e2b7cee8f0a4f1bc.jpg",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userScheme);

module.exports = User;
