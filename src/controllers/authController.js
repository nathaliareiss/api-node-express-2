import User from "../models/usuario.js";
import bcrypt from "bcrypt"


export async function register(req, res) {
  try {
    const { nome, email, senha } = req.body;

    const usuarioExiste = await User.findOne({ email });
    if (usuarioExiste) {
      return res.status(400).json({ mensagem: "Usuário já existe" });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const novoUsuario = await User.create({
      nome,
      email,
      senha: senhaHash,
    });

    res.status(201).json({
      mensagem: "Usuário cadastrado com sucesso",
      userId: novoUsuario._id,
    });

  } catch (erro) {
    res.status(500).json({ mensagem: "Erro ao cadastrar usuário" });
  }
}
