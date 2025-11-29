import hospedeRepository from '../repositories/hospede.repository.js';
import ApiError from '../errors/ApiError.js';

const criarHospede = async (dados) => {
    const { nome, cpf, telefone, email } = dados;
    if (!nome || !cpf || !telefone || !email) {
        throw new ApiError("Todos os campos (nome, cpf, telefone, email) são obrigatórios.", 400);
    }
    // Aqui poderia validar se CPF já existe, etc...
    return await hospedeRepository.create(dados);
};

const listarHospedes = async () => {
    return await hospedeRepository.findAll();
};

const atualizarHospede = async (id, dados) => {
    // Garante que o hóspede existe antes de tentar atualizar
    const existe = await hospedeRepository.findById(id);
    if (!existe) {
        throw new ApiError("Hóspede não encontrado.", 404);
    }
    return await hospedeRepository.update(id, dados);
};

const deletarHospede = async (id) => {
    const sucesso = await hospedeRepository.remove(id);
    if (!sucesso) {
        throw new ApiError("Hóspede não encontrado.", 404);
    }
    return { message: "Hóspede removido com sucesso." };
};

export default { criarHospede, listarHospedes, atualizarHospede, deletarHospede };