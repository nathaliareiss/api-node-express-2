
let favoritos = []; 
exports.addFavorito = (req, res) => {
  const { id, titulo } = req.body; 
  const livro = { id, titulo };
  favoritos.push(livro);
  res.status(201).json({ message: "Livro adicionado aos favoritos!", livro });
};

exports.getFavoritos = (req, res) => {
  res.json(favoritos);
};

exports.deleteFavorito = (req, res) => {
  const { id } = req.params;
  favoritos = favoritos.filter(livro => livro.id !== id);
  res.json({ message: "Livro removido dos favoritos!" });
};