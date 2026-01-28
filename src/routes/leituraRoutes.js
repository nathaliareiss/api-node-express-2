import express from "express";
import leituraController from "../controllers/leituraController.js";
import authMiddleware from "../middlewares/authMiddleware.js";



const router = express.Router();

router.post("/livros/iniciar",authMiddleware, leituraController.iniciarLeitura);
router.post("/livros/:livroId/finalizar",authMiddleware, leituraController.finalizarLeitura);
router.get("/leituras",authMiddleware, leituraController.listarLeituras);

export default router;