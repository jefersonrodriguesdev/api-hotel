const quartoRepository = require('../repositories/quarto.repository');
const tipoQuartoRepository = require('../repositories/tipoQuarto.repository');
const reservaRepository = require('../repositories/reserva.repository');
const ApiError = require('../errors/ApiError'); // Importa o ApiError

const criarReserva = async (dadosReserva) => {
    const { numeroQuarto, quantidadePessoas, dataEntrada, dataSaida } = dadosReserva;

    const quarto = await quartoRepository.findByNumero(numeroQuarto);
    if (!quarto) {
        throw new ApiError("Quarto não encontrado.", 404);
    }

    const infoTipoQuarto = await tipoQuartoRepository.findByTipo(quarto.tipo);
    if (quantidadePessoas > infoTipoQuarto.capacidade) {
        throw new ApiError(`A quantidade de pessoas excede a capacidade do quarto (${infoTipoQuarto.capacidade}).`, 400);
    }

    const reservasConflitantes = await reservaRepository.findConflito(numeroQuarto, dataEntrada, dataSaida);
    if (reservasConflitantes.length > 0) {
        throw new ApiError("Este quarto já está reservado para o período solicitado.", 409);
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
        throw new ApiError("Reserva não encontrada.", 404);
    }
    return reserva;
};

const atualizarReserva = async (id, dadosReserva) => {
    const { numeroQuarto, quantidadePessoas, dataEntrada, dataSaida } = dadosReserva;

    await buscarReservaPorId(id); // Garante que a reserva existe (já lança 404 se não existir)

    const quarto = await quartoRepository.findByNumero(numeroQuarto);
    if (!quarto) {
        throw new ApiError("Quarto não encontrado.", 404);
    }

    const infoTipoQuarto = await tipoQuartoRepository.findByTipo(quarto.tipo);
    if (quantidadePessoas > infoTipoQuarto.capacidade) {
        throw new ApiError(`A quantidade de pessoas excede a capacidade do quarto (${infoTipoQuarto.capacidade}).`, 400);
    }
    
    const reservasConflitantes = await reservaRepository.findConflito(numeroQuarto, dataEntrada, dataSaida, id);
    if (reservasConflitantes.length > 0) {
        throw new ApiError("Este quarto já está reservado para o período solicitado.", 409);
    }

    return await reservaRepository.update(id, dadosReserva);
};

const deletarReserva = async (id) => {
    const sucesso = await reservaRepository.remove(id);
    if (!sucesso) {
        throw new ApiError("Reserva não encontrada.", 404);
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