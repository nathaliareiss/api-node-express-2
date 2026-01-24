import express from "express";
import livros from "./livrosRoutes.js"
import autores from "./autoresRoutes.js"
import favoritos from "./favoritosRoutes.js"
import googleRoutes from "./googleRoutes.js"
import calendarRoutes from './calendarRoutes.js'

const routes = (app) => {
  app.route('/').get((req, res) => {
    res.status(200).send({titulo: "Curso de node"})
  })

  app.use(
    livros,
    autores,
    favoritos,
    calendarRoutes,
    googleRoutes
  )
}

export default routes