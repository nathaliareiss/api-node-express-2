const express = require("express");
const router = express.Router();
const favoritosController = require("./controllers/favoritosController");


router.post("/favoritos", favoritosController.addFavorito);


router.get("/favoritos", favoritosController.getFavoritos);


router.delete("/favoritos/:id", favoritosController.deleteFavorito);

module.exports = router;