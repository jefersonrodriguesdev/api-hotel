const usuarioRepository = require('../repositories/usuario.repository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = 'seu-segredo-super-secreto-para-o-jwt';

const registrarUsuario = async (dadosUsuario) => {
    const { email, senha } = dadosUsuario;

    const usuarioExistente = await usuarioRepository.findByEmail(email);
    if (usuarioExistente) {
        const erro = new Error("E-mail já cadastrado.");
        erro.statusCode = 409; // Conflict
        throw erro;
    }

    const hashSenha = await bcrypt.hash(senha, 10); // 10 é o custo do hash
    dadosUsuario.senha = hashSenha;

    const novoUsuario = await usuarioRepository.create(dadosUsuario);
    novoUsuario.senha = undefined; // Não retornar a senha no response
    return novoUsuario;
};

const login = async (email, senha) => {
    const usuario = await usuarioRepository.findByEmail(email);
    if (!usuario) {
        const erro = new Error("E-mail ou senha inválidos.");
        erro.statusCode = 401; // Unauthorized
        throw erro;
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
        const erro = new Error("E-mail ou senha inválidos.");
        erro.statusCode = 401;
        throw erro;
    }

    const token = jwt.sign({ id: usuario.id }, secret, { expiresIn: '8h' });

    return { 
        usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email },
        token 
    };
};

module.exports = { registrarUsuario, login };