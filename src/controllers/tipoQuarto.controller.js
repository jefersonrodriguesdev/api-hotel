import tipoQuartoService from '../services/tipoQuarto.service.js';

const criar = async (req, res, next) => {
  try {
    const tipoQuarto = await tipoQuartoService.criarTipoQuarto(req.body);
    return res.status(201).json(tipoQuarto);
  } catch (err) {
    next(err);
  }
};

const listar = async (req, res, next) => {
  try {
    const lista = await tipoQuartoService.listarTiposQuarto();
    return res.status(200).json(lista);
  } catch (err) {
    next(err);
  }
};

const buscarPorTipo = async (req, res, next) => {
  try {
    const { tipo } = req.params;
    const tq = await tipoQuartoService.buscarPorTipo(tipo);
    return res.status(200).json(tq);
  } catch (err) {
    next(err);
  }
};

export default {
  criar,
  listar,
  buscarPorTipo
};
