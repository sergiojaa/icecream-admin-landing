import userModel from "../models/userModel.js";

export const getUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const addUser = async (req, res) => {
  try {
    const newUser = await userModel.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    console.error("Error adding user:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
