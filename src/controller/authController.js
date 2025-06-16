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
