import IceCream from "../models/iceCreamModel";

const getIceCreams = async (req, res) => {
  try {
    const iceCreams = await IceCream.find({});
    res.status(200).json(iceCreams);
  } catch (err) {
    console.error("Error fetching ice creams:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getIceCreamById = async (req, res) => {
  const { id } = req.params;
  try {
    const iceCream = await iceCream.findById(id);
    if (!iceCream) {
      return res.status(404).json({
        message: "Ice cream not found",
      });
    }
  } catch (err) {
    console.error("Error fetching ice cream by ID:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
