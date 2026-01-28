import express from "express";
import LivroController from "../controllers/livrosController.js";
import authMiddleware from "../middlewares/authMiddleware.js";



const router = express.Router();

router
  .get("/livros",authMiddleware, LivroController.listarMeusLivros)
  .post("/livros",authMiddleware, LivroController.adicionarLivro)
  .patch("/livros/:id/iniciar",authMiddleware, LivroController.iniciarLeitura)
  .patch("/livros/:id/finalizar",authMiddleware, LivroController.finalizarLeitura)
  .patch("/livros/:id/favorito",authMiddleware, LivroController.alternarFavorito)

export default router;   