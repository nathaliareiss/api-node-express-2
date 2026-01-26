import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { criarEvento,listarEventos } from "../controllers/calendarController.js";

const router = express.Router();

router.post("/calendar/events",authMiddleware, criarEvento);
router.get("/calendar",authMiddleware, listarEventos);



export default router;
