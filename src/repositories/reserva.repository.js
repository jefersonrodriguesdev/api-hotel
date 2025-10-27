import { reservas, ReservarQuarto } from '../data/database.js';

const findConflito = async (numeroQuarto, dataEntrada, dataSaida, idExcecao = null) => {
    const dataEntradaNova = new Date(dataEntrada);
    const dataSaidaNova = new Date(dataSaida);

    const conflitos = reservas.filter(reserva => {
        if (idExcecao && reserva.id === idExcecao) {
            return false;
        }
        if (reserva.numeroQuarto === numeroQuarto) {
            const dataEntradaExistente = new Date(reserva.dataEntrada);
            const dataSaidaExistente = new Date(reserva.dataSaida);
            return dataEntradaNova < dataSaidaExistente && dataSaidaNova > dataEntradaExistente;
        }
        return false;
    });

    return Promise.resolve(conflitos);
};

const create = async (dadosReserva) => {
    const id = reservas.length > 0 ? reservas[reservas.length - 1].id + 1 : 1;
    const dataReserva = new Date();

    const novaReserva = new ReservarQuarto(
        id,
        dadosReserva.idCliente,
        dadosReserva.numeroQuarto,
        dadosReserva.quantidadePessoas,
        dataReserva,
        dadosReserva.dataEntrada,
        dadosReserva.dataSaida
    );

    reservas.push(novaReserva);
    return Promise.resolve(novaReserva);
};

const findAll = async () => {
    return Promise.resolve(reservas);
};

const findById = async (id) => {
    const reserva = reservas.find(r => r.id === id);
    return Promise.resolve(reserva);
};

const update = async (id, dadosReserva) => {
    const index = reservas.findIndex(r => r.id === id);
    if (index === -1) {
        return Promise.resolve(null);
    }
    const reservaAtualizada = { ...reservas[index], ...dadosReserva };
    reservas[index] = reservaAtualizada;
    return Promise.resolve(reservaAtualizada);
};

const remove = async (id) => {
    const index = reservas.findIndex(r => r.id === id);
    if (index === -1) {
        return Promise.resolve(false);
    }
    reservas.splice(index, 1);
    return Promise.resolve(true);
};

export default { findConflito, create, findAll, findById, update, remove };