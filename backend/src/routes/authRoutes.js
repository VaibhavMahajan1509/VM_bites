import express from "express";
import {
  signup,
  login,
  logout,
  me,
} from "../controllers/authController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

//  AUTH ROUTES 
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);


// CURRENT USER 
router.get("/me", authMiddleware, me);

export default router;