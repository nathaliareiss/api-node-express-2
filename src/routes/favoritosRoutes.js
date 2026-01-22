const { Router} = require('express')

const {getFavoritos,postFavorito,deleteFavorito} = require("../controllers/favoritosController");


const router = Router

router.post("/favoritos", favoritosController.postFavorito);


router.get("/favoritos", favoritosController.getFavoritos);


router.delete("/favoritos/:id", favoritosController.deleteFavorito);

module.exports = router;