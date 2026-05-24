import Food from "../models/Food.model.js";
import Order from "../models/Order.model.js";

// ADD FOOD 
export const addFood = async (req, res) => {
  try {
    const { name, price, image, description, category } = req.body;

    if (!name || !price || !image) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const food = await Food.create({
      name,
      price,
      image,
      description,
      category,
    });

    res.status(201).json({
      message: "Food added",
      food,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

//  UPDATE FOOD 
export const updateFood = async (req, res) => {
  
  try {
    const { id } = req.params;

    const food = await Food.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }

    res.json({
      message: "Food updated",
      food,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE FOOD 
export const deleteFood = async (req, res) => {
  try {
    const { id } = req.params;

    const food = await Food.findByIdAndDelete(id);

    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }

    res.json({ message: "Food deleted" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

//  GET ALL ORDERS 
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("userId", "name email")
      .populate("items.foodId");

    res.json(orders);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE ORDER STATUS
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await Order.findByIdAndUpdate(id, { status });

    res.json({ message: "Order updated" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};