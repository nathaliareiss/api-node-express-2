import express from "express";
import { getFavoritos, postFavorito, deleteFavorito } from "../controllers/favoritosController.js";

const router = express.Router();

router.post("/favoritos", postFavorito);
router.get("/favoritos", getFavoritos);
router.delete("/favoritos/:id", deleteFavorito);

export default router;