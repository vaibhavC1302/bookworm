import express from "express";
import "dotenv/config";
// import { connectDB } from "../src/lib/db.js";
import cors from "cors";
import dbConnect from "../src/lib/db.js";
//routers
import authRoutes from "../src/routes/authRoutes.js";
import bookRoutes from "../src/routes/bookRoutes.js";

// constants and middlewares
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(cors());

// Global connection state
let isConnected = false;

// Database connection middleware
app.use(async (req, res, next) => {
  if (!isConnected) {
    try {
      await dbConnect();
      isConnected = true;
      console.log("Database connected successfully");
    } catch (error) {
      console.error("Database connection failed:", error);
      return res.status(500).json({
        error: "Database connection failed",
        message: error.message,
      });
    }
  }
  next();
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    database: isConnected ? "connected" : "disconnected",
    timestamp: new Date().toISOString(),
  });
});

// Your main API endpoint
app.get("/api", (req, res) => {
  res.json({
    message: "Hello from Vercel with MongoDB!",
    database: isConnected ? "connected" : "disconnected",
  });
});

// main routes
app.use("/api/auth", authRoutes);
app.use("/api/book", bookRoutes);

app.listen(PORT, () => {
  console.log("server running on port:", PORT);
  connectDB();
});
// export default app;
