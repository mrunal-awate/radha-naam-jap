import { Router } from "express";
import {
  registerDeviceToken,
  sendTestNotification,
  sendNotification,
} from "../controllers/notificationController.js";
import { requireAuth, requireAdminKey, optionalAuth } from "../middleware/auth.js";

const router = Router();

router.post("/token", optionalAuth, registerDeviceToken);
router.post("/test", requireAuth, sendTestNotification);
router.post("/send", requireAuth, requireAdminKey, sendNotification);

export default router;