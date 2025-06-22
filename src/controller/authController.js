import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
const createToken = (id) => {
  return jwt.sign({ id }, "secret", { expiresIn: "90d" });
};

export const signUp = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    const token = jwt.sign(newUser._id);

    res.status(201).json({
      status: "success",
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
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
