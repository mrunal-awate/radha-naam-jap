import { Router } from "express";
import { 
    registerDeviceToken, 
    sendTestNotification,
} from "../controllers/notificationController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.post("/token", requireAuth, registerDeviceToken);
router.post("/test", requireAuth, sendTestNotification);

export default router;