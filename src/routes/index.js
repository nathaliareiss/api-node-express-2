import express from "express";
import livros from "./livrosRoutes.js"
import autores from "./autoresRoutes.js"
import favoritos from "./favoritosRoutes.js"
import googleRoutes from "./googleRoutes.js"
import calendarRoutes from './calendarRoutes.js'
import authRoutes from "./authRoutes.js"
import booksExternalRoutes from "./booksExternalRoutes.js";
import leitura from "./leituraRoutes.js";



const routes = (app) => {
  app.route('/').get((req, res) => {
    res.status(200).send({titulo: "Ok, aqui estamos!"})
  })

  app.use(
    booksExternalRoutes,
    authRoutes,
    livros,
    leitura,
    autores,
    favoritos,
    calendarRoutes,
    googleRoutes,
    
  )
}

export default routes