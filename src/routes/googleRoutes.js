import express from "express";
import { connectGoogle, googleCallback } from "../controllers/googleController.js";

const router = express.Router();

router.get("/auth/google", connectGoogle);
router.get("/auth/google/callback", googleCallback);

export default router;
