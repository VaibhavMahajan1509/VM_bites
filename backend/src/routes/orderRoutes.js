import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import {
  placeOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";

const router = express.Router();

// USER
router.post("/place", authMiddleware, placeOrder);
router.get("/user", authMiddleware, getUserOrders);

// ADMIN
router.get("/all", authMiddleware, adminMiddleware, getAllOrders);
router.patch("/status/:id", authMiddleware, adminMiddleware, updateOrderStatus);

export default router;