import Order from "../models/Order.model.js";
import Cart from "../models/Cart.model.js";

// ================= PLACE ORDER =================
export const placeOrder = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { items, amount } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const order = await Order.create({
      userId,
      items,
      amount,
      status: "pending",
    });

    await Cart.updateOne({ userId }, { $set: { items: [] } });

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= USER ORDERS =================
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.userId;

    const orders = await Order.find({ userId })
      .populate("items.foodId");

    res.json({
      message: "User orders fetched",
      orders,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= ADMIN: GET ALL ORDERS =================
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("userId", "name email")
      .populate("items.foodId");

    res.json({
      message: "All orders fetched",
      orders,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= ADMIN: UPDATE ORDER STATUS =================
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({
      message: "Order status updated",
      order,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};