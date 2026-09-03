import "dotenv/config";
import express from "express";
import cors from "cors";

import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import mantraRoutes from "./routes/mantraRoutes.js";
import japaRoutes from "./routes/japaRoutes.js";

import notificationRoutes from "./routes/notificationRoutes.js";

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/mantras", mantraRoutes);
app.use("/api/japa", japaRoutes);

app.use("/api/notifications", notificationRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Radha Naam Jap API is running",
  });
});

// Render provides PORT through environment variables
const PORT = process.env.PORT || 5000;

// Start server after MongoDB connection
connectDB()
  .then(() => {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  });