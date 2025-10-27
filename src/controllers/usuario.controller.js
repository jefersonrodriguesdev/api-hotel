import usuarioService from '../services/usuario.service.js';
import ApiError from '../errors/ApiError.js';

const registrar = async (req, res) => {
    const { nome, email, telefone, senha } = req.body;
    if (!nome || !email || !telefone || !senha) {
        throw new ApiError("Todos os campos são obrigatórios.", 400);
    }
    const novoUsuario = await usuarioService.registrarUsuario(req.body);
    return res.status(201).json({ message: "Usuário registrado com sucesso!", usuario: novoUsuario });
};

const login = async (req, res) => {
    const { email, senha } = req.body;
    if (!email || !senha) {
        throw new ApiError("E-mail e senha são obrigatórios.", 400);
    }
    const dadosLogin = await usuarioService.login(email, senha);
    return res.status(200).json(dadosLogin);
};

export default { registrar, login };