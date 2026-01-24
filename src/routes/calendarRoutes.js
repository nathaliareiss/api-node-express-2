import express from "express";
import { criarEvento } from "../controllers/calendarController.js";

const router = express.Router();

router.post("/calendar/events", criarEvento);

export default router;
