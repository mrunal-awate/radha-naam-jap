import { Router } from "express";
import { registerDeviceToken } from "../controllers/notificationController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.post("/token", requireAuth, registerDeviceToken);

export default router;