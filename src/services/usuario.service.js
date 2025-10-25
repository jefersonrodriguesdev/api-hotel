const usuarioRepository = require('../repositories/usuario.repository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = 'seu-segredo-super-secreto-para-o-jwt';
const ApiError = require('../errors/ApiError'); // Importa o ApiError

const registrarUsuario = async (dadosUsuario) => {
    const { email, senha } = dadosUsuario;

    const usuarioExistente = await usuarioRepository.findByEmail(email);
    if (usuarioExistente) {
        throw new ApiError("E-mail já cadastrado.", 409);
    }

    const hashSenha = await bcrypt.hash(senha, 10);
    dadosUsuario.senha = hashSenha;

    const novoUsuario = await usuarioRepository.create(dadosUsuario);
    novoUsuario.senha = undefined; 
    return novoUsuario;
};

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

module.exports = { registrarUsuario, login };