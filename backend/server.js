import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import axios from "axios";
import cors from 'cors';

import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import Goal from './models/goal.model.js';

import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

// ✅ Apply CORS FIRST — before routes and JSON parsing
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  credentials: true
}));

// ✅ Then JSON parsing
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

// ✅ Now your API routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.post('/api/generate-roadmap', async (req, res) => {
  try {
    console.log('Body:', req.body);
    res.json({ success: true, message: 'Roadmap generated!' });
  } catch (err) {
    console.error('❌ Error generating roadmap:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ✅ Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
  connectDB();
});
