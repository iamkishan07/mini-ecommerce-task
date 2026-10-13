import express from "express";
import authRoutes from "../routes/auth.routes.js";
import cookieParser from "cookie-parser";
import productRoutes from "../routes/products.routes.js";
import cors from "cors";

const app = express();

const allowedOrigins = [
  "https://mini-ecommerce-task.vercel.app",
  "https://mini-ecommerce-task-5pi6aahuk-kishaniam401-gmailcoms-projects.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

export default app;