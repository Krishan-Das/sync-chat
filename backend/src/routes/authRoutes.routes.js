import express from "express"
import * as authController from "../controllers/authController.controller.js"
import { authenticated } from "../middlewares/authenticated.middleware.js";
const router = express.Router()


// --- API's ---
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", authenticated, authController.getMe);
router.get("/all-other-users", authenticated, authController.allOtherUsers);
router.post("/logout", authController.logOut);


export default router;