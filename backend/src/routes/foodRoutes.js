import express from "express";
import Food from "../models/Food.model.js";

const router = express.Router();

// GET ALL FOODS
router.get("/", async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;