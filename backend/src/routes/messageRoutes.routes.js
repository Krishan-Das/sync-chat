import express from "express"
import * as messageController from "../controllers/messageController.controller.js";
import { authenticated } from "../middlewares/authenticated.middleware.js";

const router = express.Router();

// --- API's ---
router.post("/send/:receiverId",authenticated, messageController.send);
router.get("/read/:otherUserId", authenticated, messageController.read);

export default router;