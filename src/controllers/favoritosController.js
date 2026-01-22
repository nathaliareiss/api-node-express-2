let favoritos = []; // simulando em memória

export const postFavorito = (req, res) => {
  try {
    const { id, titulo } = req.body;
    if (!id || !titulo) {
      return res.status(400).json({ message: "ID e título são obrigatórios" });
    }
    const livro = { id, titulo };
    favoritos.push(livro);
    res.status(201).json({ message: "Livro adicionado aos favoritos!", livro });
  } catch (error) {
    res.status(500).json({ message: "Erro interno", error: error.message });
  }
};

export const getFavoritos = (req, res) => {
  try {
    res.json(favoritos);
  } catch (error) {
    res.status(500).json({ message: "Erro interno", error: error.message });
  }
};

export const deleteFavorito = (req, res) => {
  try {
    const { id } = req.params;
    const tamanhoAntes = favoritos.length;
    favoritos = favoritos.filter(livro => livro.id !== id);

    if (favoritos.length === tamanhoAntes) {
      return res.status(404).json({ message: "Livro não encontrado nos favoritos" });
    }

    res.json({ message: "Livro removido dos favoritos!" });
  } catch (error) {
    res.status(500).json({ message: "Erro interno", error: error.message });
  }
};