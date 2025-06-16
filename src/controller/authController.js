import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
export const signUp = (req, res, next) => {
  const newUser = User.create(req.body);
  const token = jwt.sign(
    {
      id: newUser._id,
    },
    "secret",
    {
      expiresIn: "900d",
    }
  );

  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });
};
export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      status: "fail",
      message: "Please provide email and password",
    });
  }
  const user = await User.findOne({ email }).select("+password");
  console.log(user);
  const token = "";
  res.status(200).json({
    status: "success",
    token,
  });
};
