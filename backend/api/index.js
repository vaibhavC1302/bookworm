import express from "express";
import "dotenv/config";
import { connectDB } from "../src/lib/db.js";
import cors from "cors";

//routers
import authRoutes from "../src/routes/authRoutes.js";
import bookRoutes from "../src/routes/bookRoutes.js";

// constants and middlewares
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(cors());

// routes
app.get("/api", (req, res) => {
  res.json({ message: "Hello World" });
});
app.use("/api/auth", authRoutes);
app.use("/api/book", bookRoutes);

// app.listen(PORT, () => {
//   console.log("server running on port:", PORT);
//   connectDB();
// });
export default app;
