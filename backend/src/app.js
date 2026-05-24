import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import foodRoutes from "./routes/foodRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

import paymentRouter from "./routes/paymentRoute.js";

const app = express();

// CORS 
app.use(
  cors({
    origin: [
      "http://localhost:5173"
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/admin", adminRoutes);

app.use("/api/payment", paymentRouter);

export default app;