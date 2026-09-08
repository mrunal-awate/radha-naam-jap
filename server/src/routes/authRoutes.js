import { Router } from "express";
import { register, login, deleteAccount } from "../controllers/authController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();
router.post("/register", register);
router.post("/login", login);
router.delete("/account", requireAuth, deleteAccount);

export default router;