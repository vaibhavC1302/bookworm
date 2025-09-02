import express from "express";
import "dotenv/config";
import { connectDB } from "./lib/db.js";
import cors from "cors";

//routers
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";

// constants and middlewares
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(cors());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/book", bookRoutes);

app.listen(PORT, () => {
  console.log("server running on port:", PORT);
  connectDB();
});
