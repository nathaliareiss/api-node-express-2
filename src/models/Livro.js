import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
  {
    id: {type: String},
    titulo: {type: String, 
      required: [true, "o titulo do livro e obrigatorio"]},
    autor: {type: mongoose.Schema.Types.ObjectId, ref: 'autores',
       required: [true, ' o nome do autor e obrigatorio']},
    editora: {type: String, 
      required: [true, ' o nome da editora e obrigatorio']},
    numeroPaginas: {type: Number}
  }
);

const livros= mongoose.model('livros', livroSchema);

export default livros;