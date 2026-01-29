import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";
import authRoutes from './routes/authRoutes.js';
import snippetRoutes from "./routes/snippetRoute.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.get("/", (req, res) => {
  res.send("Snippify API is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/snippets", snippetRoutes);

app.listen(3000, () => console.log(`Server is running on PORT 3000`));