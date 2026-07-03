import dotenv from "dotenv";
dotenv.config();
import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors"
import authRoutes from "./routes/authRoutes.routes.js"
import messageRoutes from "./routes/messageRoutes.routes.js"

const app = express()

// --- middlewares ---
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173", // frontend site port
  credentials: true
}))

// --- routes ---
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);



export default app;