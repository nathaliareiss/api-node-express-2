import express from "express";
import LivroController from "../controllers/livrosController.js";

const router = express.Router();

router
  .get("/livros", LivroController.listarMeusLivros)
  .post("/livros", LivroController.adicionarLivro)
  .patch("/livros/:id/iniciar", LivroController.iniciarLeitura)
  .patch("/livros/:id/finalizar", LivroController.finalizarLeitura)
  .patch("/livros/:id/favorito", LivroController.alternarFavorito)

export default router;   