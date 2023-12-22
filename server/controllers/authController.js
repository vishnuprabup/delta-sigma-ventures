import User from "../models/userModel.js";
import { getUsernameByEmail } from "../utils/authUtils.js";

export const signupController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const ifUserExist = await User.findOne({ email: email });
      if (!ifUserExist) {
        const username = getUsernameByEmail(email);
        const newUser = await User.create({
          email,
          password: req.body.password,
          username,
        });
        const { _id, password, __v, ...others } = newUser._doc;
        res.status(200).json(others);
      } else {
        res.status(400).json({
          message: "User already exist please sign in",
        });
      }
    } else {
      res.status(400).json({
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const ifUserExist = await User.findOne({ email: email });
      if (ifUserExist) {
        const { password, __v, _id, ...others } = ifUserExist._doc;
        if (req.body.password === password) {
          res.status(200).json(others);
        } else {
          res.status(403).json({
            messagae: "Incorrect password",
          });
        }
      } else {
        res.status(400).json({
          message: "User not found please sign up",
        });
      }
    } else {
      res.status(400).json({
        message: "Interval server error",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Intenal server error",
    });
  }
};
