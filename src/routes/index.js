import express from "express";
import livros from "./livrosRoutes.js"
import autores from "./autoresRoutes.js"
import favoritos from "./favoritosRoutes.js"
import googleRoutes from "./googleRoutes.js"
import calendarRoutes from './calendarRoutes.js'
import authRoutes from "./authRoutes.js"
import booksExternalRoutes from "./booksExternalRoutes.js";

const routes = (app) => {
  app.route('/').get((req, res) => {
    res.status(200).send({titulo: "Curso de node"})
  })

  app.use(
    booksExternalRoutes,
    authRoutes,
    livros,
    autores,
    favoritos,
    calendarRoutes,
    googleRoutes,
    
  )
}

export default routes