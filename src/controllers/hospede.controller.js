import hospedeService from '../services/hospede.service.js';

const criar = async (req, res) => {
    const hospede = await hospedeService.criarHospede(req.body);
    res.status(201).json({ message: "Hóspede cadastrado com sucesso!", hospede });
};

const listar = async (req, res) => {
    const lista = await hospedeService.listarHospedes();
    res.status(200).json(lista);
};

const atualizar = async (req, res) => {
    const id = parseInt(req.params.id);
    const hospede = await hospedeService.atualizarHospede(id, req.body);
    res.status(200).json({ message: "Hóspede atualizado!", hospede });
};

const deletar = async (req, res) => {
    const id = parseInt(req.params.id);
    const resultado = await hospedeService.deletarHospede(id);
    res.status(200).json(resultado);
};

export default { criar, listar, atualizar, deletar };