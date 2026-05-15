import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

import {
  addFood,
  updateFood,
  deleteFood,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/adminController.js";

const router = express.Router();

// FOOD
router.post("/food", authMiddleware, adminMiddleware, addFood);
router.put("/food/:id", authMiddleware, adminMiddleware, updateFood);
router.delete("/food/:id", authMiddleware, adminMiddleware, deleteFood);

// ORDERS
router.get("/orders", authMiddleware, adminMiddleware, getAllOrders);
router.put("/orders/:id", authMiddleware, adminMiddleware, updateOrderStatus);

export default router;