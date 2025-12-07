import tipoQuartoRepository from '../repositories/tipoQuarto.repository.js';
import ApiError from '../errors/ApiError.js';

const criarTipoQuarto = async (dados) => {
  const { tipo, capacidade, descricao } = dados;

  if (!tipo || !capacidade || !descricao) {
    throw new ApiError("Campos 'tipo', 'capacidade' e 'descricao' são obrigatórios.", 400);
  }

  // verifica duplicado no banco
  const existente = await tipoQuartoRepository.findByTipo(tipo);
  if (existente) {
    throw new ApiError(`O tipo de quarto '${tipo}' já existe.`, 409);
  }

  return await tipoQuartoRepository.create(dados);
};

const listarTiposQuarto = async () => {
  return await tipoQuartoRepository.findAll();
};

const buscarPorTipo = async (tipo) => {
  const tq = await tipoQuartoRepository.findByTipo(tipo);
  if (!tq) {
    throw new ApiError("Tipo de quarto não encontrado.", 404);
  }
  return tq;
};

export default {
  criarTipoQuarto,
  listarTiposQuarto,
  buscarPorTipo
};
