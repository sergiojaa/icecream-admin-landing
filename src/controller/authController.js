import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"; // ✅ REQUIRED

const createToken = (id) => {
  return jwt.sign({ id }, "secret", { expiresIn: "90d" });
};

export const signUp = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    const token = createToken(newUser._id);
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

  // 1. Check for missing email or password
  if (!email || !password) {
    return res.status(400).json({
      status: "fail",
      message: "Please provide email and password",
    });
  }

  // 2. Find user by email and explicitly select password
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({
      status: "fail",
      message: "Invalid email or password",
    });
  }

  // 3. Compare the passwords
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({
      status: "fail",
      message: "Invalid email or password",
    });
  }

  // 4. Generate token
  const token = createToken(user._id);

  // 5. Return response
  res.status(200).json({
    status: "success",
    token,
    data: {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    },
  });
};
