import hospedeService from '../services/hospede.service.js';

const criar = async (req, res, next) => {
  try {
    const hospede = await hospedeService.criarHospede(req.body);
    res.status(201).json({ message: "Hóspede cadastrado com sucesso!", hospede });
  } catch (err) {
    next(err);
  }
};

const listar = async (req, res, next) => {
  try {
    const lista = await hospedeService.listarHospedes();
    res.status(200).json(lista);
  } catch (err) {
    next(err);
  }
};

const buscarPorId = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const hospede = await hospedeService.buscarHospedePorId(id);
    res.status(200).json(hospede);
  } catch (err) {
    next(err);
  }
};

const atualizar = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const hospede = await hospedeService.atualizarHospede(id, req.body);
    res.status(200).json({ message: "Hóspede atualizado!", hospede });
  } catch (err) {
    next(err);
  }
};

const deletar = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const resultado = await hospedeService.deletarHospede(id);
    res.status(200).json(resultado);
  } catch (err) {
    next(err);
  }
};

export default { 
  criar, 
  listar, 
  buscarPorId,
  atualizar, 
  deletar 
};
