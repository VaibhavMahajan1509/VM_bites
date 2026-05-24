import express from "express";
import Razorpay from "razorpay";
import "dotenv/config";

const paymentRouter = express.Router();

paymentRouter.post("/create-order", async (req, res) => {
  try {
    // Move Razorpay instance INSIDE the function
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const { amount } = req.body;
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default paymentRouter;