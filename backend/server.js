import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import roadmapRoutes from "./routes/roadmap.route.js";
import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

// ✅ CORS
const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL,
  "https://frost-pro.vercel.app",
];

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin || allowedOrigins.includes(origin)) cb(null, true);
      else cb(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// ✅ Middlewares
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api", roadmapRoutes);

// ✅ Health check
app.get("/", (req, res) => {
  res.send("Questify Backend Live 🚀");
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
  connectDB();
});
