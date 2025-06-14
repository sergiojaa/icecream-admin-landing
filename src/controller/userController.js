import userModel from "../models/userModel";

const getUsers = async (req, res) => {
  try {
    const userModel = await userModel.find({});
    res.status(200).json(userModel);
  } catch (err) {
    console.error("Error fetching ice creams:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const userModel = await userModel.findById(id);
    if (!userModel) {
      return res.status(404).json({
        message: "Ice cream not found",
      });
    }
    res.status(200).json(userModel);
  } catch (err) {
    console.error("Error fetching ice cream by ID:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
