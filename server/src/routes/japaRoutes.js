import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { syncJapa, getStats, getWeeklyStats, getTodayCount, resetJapa } from "../controllers/japaController.js";

const router = Router();
router.use(requireAuth); // every japa route requires login

router.post("/sync", syncJapa);
router.post("/reset", resetJapa);
router.get("/today", getTodayCount);
router.get("/stats", getStats);
router.get("/stats/weekly", getWeeklyStats);

export default router;
