const { Router} = require('express')

const {getFavoritos,postFavorito,deleteFavorito} = require("../controllers/favoritosController");


const router = Router()

router.post("/:id", postFavorito);


router.get("/", getFavoritos);


router.delete("/:id",deleteFavorito);

module.exports = router;