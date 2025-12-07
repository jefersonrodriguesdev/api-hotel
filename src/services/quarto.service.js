import quartoRepository from '../repositories/quarto.repository.js';
import tipoQuartoRepository from '../repositories/tipoQuarto.repository.js';
import ApiError from '../errors/ApiError.js';

const criarQuarto = async (dados) => {
  const { numero, tipo, valorDiaria, status } = dados;

  if (!numero || !tipo || !valorDiaria || !status) {
    throw new ApiError("Todos os campos (numero, tipo, valorDiaria, status) são obrigatórios.", 400);
  }

  // Já existe quarto com esse número?
  const existente = await quartoRepository.findByNumero(numero);
  if (existente) {
    throw new ApiError(`O quarto número ${numero} já está cadastrado.`, 409);
  }

  // Tipo de quarto precisa existir na tabela tipos_quarto
  const tipoExistente = await tipoQuartoRepository.findByTipo(tipo);
  if (!tipoExistente) {
    throw new ApiError(`O tipo de quarto '${tipo}' é inválido.`, 400);
  }

  return await quartoRepository.create(dados);
};

const listarQuartos = async () => {
  return await quartoRepository.findAll();
};

const buscarPorNumero = async (numero) => {
  const quarto = await quartoRepository.findByNumero(numero);
  if (!quarto) {
    throw new ApiError("Quarto não encontrado.", 404);
  }
  return quarto;
};

const atualizarQuarto = async (numero, dados) => {
  // garante que existe
  await buscarPorNumero(numero);

  const { tipo, valorDiaria, status } = dados;
  if (!tipo || !valorDiaria || !status) {
    throw new ApiError("Campos tipo, valorDiaria e status são obrigatórios para atualização.", 400);
  }

  // valida tipo
  const tipoExistente = await tipoQuartoRepository.findByTipo(tipo);
  if (!tipoExistente) {
    throw new ApiError(`O tipo de quarto '${tipo}' é inválido.`, 400);
  }

  const atualizado = await quartoRepository.update(numero, dados);
  return atualizado;
};

const deletarQuarto = async (numero) => {
  // garante que existe
  await buscarPorNumero(numero);
  await quartoRepository.remove(numero);
};

export default {
  criarQuarto,
  listarQuartos,
  buscarPorNumero,
  atualizarQuarto,
  deletarQuarto
};
