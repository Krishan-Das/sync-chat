import express from "express"
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.routes.js"
import messageRoutes from "./routes/messageRoutes.routes.js"
import dotenv from "dotenv";
dotenv.config();

const app = express()

// --- middlewares ---
app.use(express.json());
app.use(cookieParser());

// --- routes ---
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);



export default app;