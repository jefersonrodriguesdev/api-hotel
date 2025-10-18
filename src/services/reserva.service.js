const quartoRepository = require('../repositories/quarto.repository');
const tipoQuartoRepository = require('../repositories/tipoQuarto.repository');
const reservaRepository = require('../repositories/reserva.repository');

const criarReserva = async (dadosReserva) => {
    const { numeroQuarto, quantidadePessoas, dataEntrada, dataSaida } = dadosReserva;

    const quarto = await quartoRepository.findByNumero(numeroQuarto);
    if (!quarto) {
        const erro = new Error("Quarto não encontrado.");
        erro.statusCode = 404;
        throw erro;
    }

    const infoTipoQuarto = await tipoQuartoRepository.findByTipo(quarto.tipo);
    if (quantidadePessoas > infoTipoQuarto.capacidade) {
        const erro = new Error(`A quantidade de pessoas excede a capacidade do quarto (${infoTipoQuarto.capacidade}).`);
        erro.statusCode = 400; 
        throw erro;
    }

    const reservasConflitantes = await reservaRepository.findConflito(numeroQuarto, dataEntrada, dataSaida);
    if (reservasConflitantes.length > 0) {
        const erro = new Error("Este quarto já está reservado para o período solicitado.");
        erro.statusCode = 409; // Conflict
        throw erro;
    }

    const novaReserva = await reservaRepository.create(dadosReserva);
    return novaReserva;
};

const listarReservas = async () => {
    return await reservaRepository.findAll();
};

const buscarReservaPorId = async (id) => {
    const reserva = await reservaRepository.findById(id);
    if (!reserva) {
        const erro = new Error("Reserva não encontrada.");
        erro.statusCode = 404;
        throw erro;
    }
    return reserva;
};

const atualizarReserva = async (id, dadosReserva) => {
    // Re-valida as regras de negócio ao atualizar
    const { numeroQuarto, quantidadePessoas, dataEntrada, dataSaida } = dadosReserva;

    await buscarReservaPorId(id); // Garante que a reserva existe

    const quarto = await quartoRepository.findByNumero(numeroQuarto);
    if (!quarto) {
        const erro = new Error("Quarto não encontrado.");
        erro.statusCode = 404;
        throw erro;
    }

    const infoTipoQuarto = await tipoQuartoRepository.findByTipo(quarto.tipo);
    if (quantidadePessoas > infoTipoQuarto.capacidade) {
        const erro = new Error(`A quantidade de pessoas excede a capacidade do quarto (${infoTipoQuarto.capacidade}).`);
        erro.statusCode = 400; 
        throw erro;
    }
    
    // Na verificação de conflito, ignoramos a própria reserva que está sendo atualizada
    const reservasConflitantes = await reservaRepository.findConflito(numeroQuarto, dataEntrada, dataSaida, id);
    if (reservasConflitantes.length > 0) {
        const erro = new Error("Este quarto já está reservado para o período solicitado.");
        erro.statusCode = 409; // Conflict
        throw erro;
    }

    return await reservaRepository.update(id, dadosReserva);
};

const deletarReserva = async (id) => {
    const sucesso = await reservaRepository.remove(id);
    if (!sucesso) {
        const erro = new Error("Reserva não encontrada.");
        erro.statusCode = 404;
        throw erro;
    }
    return sucesso;
};

module.exports = {
    criarReserva,
    listarReservas,
    buscarReservaPorId,
    atualizarReserva,
    deletarReserva,
};