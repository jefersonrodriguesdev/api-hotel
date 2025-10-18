const usuarioService = require('../services/usuario.service');

const registrar = async (req, res) => {
    try {
        const { nome, email, telefone, senha } = req.body;
        if (!nome || !email || !telefone || !senha) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios." });
        }

        const novoUsuario = await usuarioService.registrarUsuario(req.body);
        return res.status(201).json({ message: "Usuário registrado com sucesso!", usuario: novoUsuario });

    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, senha } = req.body;
        if (!email || !senha) {
            return res.status(400).json({ message: "E-mail and senha são obrigatórios." });
        }

        const dadosLogin = await usuarioService.login(email, senha);
        return res.status(200).json(dadosLogin);

    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message });
    }
};

module.exports = { registrar, login };