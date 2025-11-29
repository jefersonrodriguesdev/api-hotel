import { estadias, RegistrarEstadia } from '../data/database.js';

const create = async (dados) => {
    const id = estadias.length > 0 ? estadias[estadias.length - 1].id + 1 : 1;
    
    const novaEstadia = new RegistrarEstadia(
        id, 
        dados.clienteId, 
        dados.numeroQuarto, 
        dados.valorDiaria, 
        dados.dataEntrada, 
        null // Data de saída inicia nula
    );
    estadias.push(novaEstadia);
    return Promise.resolve(novaEstadia);
};

const findAll = async () => {
    return Promise.resolve(estadias);
};

const findById = async (id) => {
    const estadia = estadias.find(e => e.id === id);
    return Promise.resolve(estadia);
};

const update = async (id, dados) => {
    const index = estadias.findIndex(e => e.id === id);
    if (index === -1) {
        return Promise.resolve(null);
    }
    // Mescla os dados existentes com os novos (ex: dataSaida, valorTotal)
    estadias[index] = { ...estadias[index], ...dados };
    return Promise.resolve(estadias[index]);
};

export default { create, findAll, findById, update };