import User from "../models/usuario.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

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


export async function login(req, res, next) {
  try {

    const { email, senha } = req.body;

    const user = await User.findOne({ email });
   
    if (!user) {
      return res.status(401).json({ mensagem: "Email ou senha inválidos" });
    }

    const senhaValida = await bcrypt.compare(senha, user.senha);
    
    if (!senhaValida) {
      return res.status(401).json({ mensagem: "Email ou senha inválidos" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );


    res.json({
      token,
      user: {
        id: user._id,
        nome: user.nome,
        email: user.email,
      },
    });
   
  } catch (erro) {
    next(erro);
  }
}