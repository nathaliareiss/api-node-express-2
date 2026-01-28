

import Livro from "../models/Livro.js";


class LivroController {

  //aqui vamos listar os livros da estante do usuario

  static listarMeusLivros = async (req, res, next) => {
    try {
      const livros = await Livro.find({ userId: req.userId })
       res.status(200).json(livros);
    } catch (erro) {
      next  (erro)
  }}

//aqui vamos adicionar livro da google books a estante do usuario
  static adicionarLivro= async (req, res, next) => {
    try {
      const{
        googleBookId,
        titulo,
        autores,
        editora,
        descricao,
        thumbnail
      } = req.body
    
  //verificar se o livro ja existe na estante do usuario para evitar duplicidade
      const livroExistente = await Livro.findOne({
        googleBookId, 
        userId: req.userId
      });

      if (livroExistente) {
        return res.status(400).json({ mensagem: "Livro já existe na sua estante" });
      }

      const livro = await Livro.create({
        googleBookId,
        titulo,
        autores,
        editora,
        descricao,
        thumbnail,
        userId: req.userId
      });

      res.status(201).json(livro);
    } catch (erro) {
      next(erro)
    } }

//pra inicar a leitura automatico
  static iniciarLeitura = async (req, res, next) => {
    try {
      const { id } = req.params;  
      const livro = await Livro.findOneAndUpdate(
        { _id: id, userId: req.userId },
        { 
          statusLeitura: "lendo",
          dataInicioLeitura: new Date()
        },
        { new: true }
      );
      res.json(livro);
    } catch (erro) {
      next(erro)
    } 
  }
//finalizar a leitura
  static finalizarLeitura = async (req, res, next) => {
    try {
      const { id } = req.params;
      const livro = await Livro.findOneAndUpdate(
        { _id: id, userId: req.userId },
        { 
          statusLeitura: "Lido",
          dataFinalLeitura: new Date()
        },
        { new: true }
      );
      res.json(livro);
    } catch (erro) {
      next(erro)
    } 
  }
  //favoritar ou desvaforitar um livro
  static alternarFavorito = async (req, res, next) => {
    try {
      const { id } = req.params;
      const livro = await Livro.findOne({ _id: id, userId: req.userId });
      livro.favorito=!livro.favorito;
      await livro.save();
      res.json(livro);  
    } catch (erro) {
      next(erro)
    }
  }
    }

export default LivroController