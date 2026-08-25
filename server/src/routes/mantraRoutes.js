import { Router } from "express";
import { listMantras, getMantraBySlug } from "../controllers/mantraController.js";

const router = Router();
router.get("/", listMantras);
router.get("/:slug", getMantraBySlug);

export default router;
