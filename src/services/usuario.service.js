import 'dotenv/config';
import usuarioRepository from '../repositories/usuario.repository.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ApiError from '../errors/ApiError.js';

const secret = process.env.JWT_SECRET;

const registrarUsuario = async (dadosUsuario) => {
    const { email, senha } = dadosUsuario;

    const usuarioExistente = await usuarioRepository.findByEmail(email);
    if (usuarioExistente) {
        throw new ApiError("E-mail já cadastrado.", 409);
    }

    const hashSenha = await bcrypt.hash(senha, 10);
    dadosUsuario.senha = hashSenha;

const novoUsuario = await usuarioRepository.create(dadosUsuario);

    const usuarioParaRetorno = {
        id: novoUsuario.id,
        nome: novoUsuario.nome,
        email: novoUsuario.email,
        telefone: novoUsuario.telefone
    };
    
    return usuarioParaRetorno;
    // -----------------------------
};;

const login = async (email, senha) => {
    const usuario = await usuarioRepository.findByEmail(email);
    if (!usuario) {
        throw new ApiError("E-mail ou senha inválidos.", 401);
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
        throw new ApiError("E-mail ou senha inválidos.", 401);
    }

    const token = jwt.sign({ id: usuario.id }, secret, { expiresIn: '8h' });

    return { 
        usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email },
        token 
    };
};

const listarUsuarios = async () => {
  const usuarios = await usuarioRepository.findAll();
  // Aqui já não vem senha porque a query não seleciona
  return usuarios;
};

export default {
  registrarUsuario,
  login,
  listarUsuarios
};