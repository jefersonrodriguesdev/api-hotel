import { hospedes, CadastrarHospede } from '../data/database.js';

const create = async (dados) => {
    const id = hospedes.length > 0 ? hospedes[hospedes.length - 1].id + 1 : 1;
    const novoHospede = new CadastrarHospede(
        id, 
        dados.nome, 
        dados.cpf, 
        dados.telefone, 
        dados.email
    );
    hospedes.push(novoHospede);
    return Promise.resolve(novoHospede);
};

const findAll = async () => {
    return Promise.resolve(hospedes);
};

const findById = async (id) => {
    const hospede = hospedes.find(c => c.id === id);
    return Promise.resolve(hospede);
};

const update = async (id, dados) => {
    const index = hospedes.findIndex(c => c.id === id);
    if (index === -1) {
        return Promise.resolve(null);
    }
    // Atualiza mantendo o ID original
    hospedes[index] = { ...hospedes[index], ...dados };
    return Promise.resolve(hospedes[index]);
};

const remove = async (id) => {
    const index = hospedes.findIndex(c => c.id === id);
    if (index === -1) {
        return Promise.resolve(false);
    }
    hospedes.splice(index, 1);
    return Promise.resolve(true);
};

export default { create, findAll, findById, update, remove };