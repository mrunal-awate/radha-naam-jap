import { Router } from "express";
import {
  registerDeviceToken,
  sendTestNotification,
  sendNotification,
} from "../controllers/notificationController.js";
import { requireAuth, requireAdmin, optionalAuth } from "../middleware/auth.js";

const router = Router();

router.post("/token", optionalAuth, registerDeviceToken);
router.post("/test", requireAuth, sendTestNotification);
router.post("/send", requireAuth, requireAdmin, sendNotification);

export default router;