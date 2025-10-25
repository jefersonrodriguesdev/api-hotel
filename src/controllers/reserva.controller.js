const reservaService = require('../services/reserva.service');
const ApiError = require('../errors/ApiError'); // Importa o ApiError

const criarReserva = async (req, res) => {
    const { idCliente, numeroQuarto, quantidadePessoas, dataEntrada, dataSaida } = req.body;
    if (!idCliente || !numeroQuarto || !quantidadePessoas || !dataEntrada || !dataSaida) {
        throw new ApiError("Todos os campos são obrigatórios.", 400);
    }
    const novaReserva = await reservaService.criarReserva(req.body);
    return res.status(201).json({ message: "Reserva criada com sucesso!", reserva: novaReserva });
};

const listarReservas = async (req, res) => {
    const reservas = await reservaService.listarReservas();
    return res.status(200).json(reservas);
};

const buscarReservaPorId = async (req, res) => {
    const id = parseInt(req.params.id);
    const reserva = await reservaService.buscarReservaPorId(id);
    return res.status(200).json(reserva);
};

const atualizarReserva = async (req, res) => {
    const id = parseInt(req.params.id);
    const { idCliente, numeroQuarto, quantidadePessoas, dataEntrada, dataSaida } = req.body;
    if (!idCliente || !numeroQuarto || !quantidadePessoas || !dataEntrada || !dataSaida) {
        throw new ApiError("Todos os campos são obrigatórios.", 400);
    }
    const reservaAtualizada = await reservaService.atualizarReserva(id, req.body);
    return res.status(200).json({ message: "Reserva atualizada com sucesso!", reserva: reservaAtualizada });
};

const deletarReserva = async (req, res) => {
    const id = parseInt(req.params.id);
    await reservaService.deletarReserva(id);
    return res.status(200).json({ message: "Reserva deletada com sucesso!" });
};

module.exports = {
    criarReserva,
    listarReservas,
    buscarReservaPorId,
    atualizarReserva,
    deletarReserva,
};