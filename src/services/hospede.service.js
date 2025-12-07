import hospedeRepository from '../repositories/hospede.repository.js';
import ApiError from '../errors/ApiError.js';

const criarHospede = async (dados) => {
  const { nome, cpf, telefone, email } = dados;

  if (!nome || !cpf || !telefone || !email) {
    throw new ApiError(
      "Todos os campos (nome, cpf, telefone, email) são obrigatórios.",
      400
    );
  }

  const novoHospede = await hospedeRepository.create(dados);
  return novoHospede;
};

const listarHospedes = async () => {
  return await hospedeRepository.findAll();
};

const buscarHospedePorId = async (id) => {
  const hospede = await hospedeRepository.findById(id);
  if (!hospede) {
    throw new ApiError("Hóspede não encontrado.", 404);
  }
  return hospede;
};

const atualizarHospede = async (id, dados) => {
  await buscarHospedePorId(id); // garante que existe
  const atualizado = await hospedeRepository.update(id, dados);
  return atualizado;
};

const deletarHospede = async (id) => {
  const sucesso = await hospedeRepository.remove(id);
  if (!sucesso) {
    throw new ApiError("Hóspede não encontrado.", 404);
  }
  return { message: "Hóspede removido com sucesso." };
};

export default {
  criarHospede,
  listarHospedes,
  buscarHospedePorId,
  atualizarHospede,
  deletarHospede
};
