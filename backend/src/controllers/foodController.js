import Food from "../models/Food.model.js";

export const getFoods = async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch foods" });
  }
};