const reservaService = require('../services/reserva.service');

const criarReserva = async (req, res) => {
    try {
        const { idCliente, numeroQuarto, quantidadePessoas, dataEntrada, dataSaida } = req.body;
        if (!idCliente || !numeroQuarto || !quantidadePessoas || !dataEntrada || !dataSaida) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios." });
        }
        const novaReserva = await reservaService.criarReserva(req.body);
        return res.status(201).json({ message: "Reserva criada com sucesso!", reserva: novaReserva });
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message });
    }
};

const listarReservas = async (req, res) => {
    try {
        const reservas = await reservaService.listarReservas();
        return res.status(200).json(reservas);
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message });
    }
};

const buscarReservaPorId = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const reserva = await reservaService.buscarReservaPorId(id);
        return res.status(200).json(reserva);
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message });
    }
};

const atualizarReserva = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { idCliente, numeroQuarto, quantidadePessoas, dataEntrada, dataSaida } = req.body;
        if (!idCliente || !numeroQuarto || !quantidadePessoas || !dataEntrada || !dataSaida) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios." });
        }
        const reservaAtualizada = await reservaService.atualizarReserva(id, req.body);
        return res.status(200).json({ message: "Reserva atualizada com sucesso!", reserva: reservaAtualizada });
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message });
    }
};

const deletarReserva = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await reservaService.deletarReserva(id);
        return res.status(200).json({ message: "Reserva deletada com sucesso!" });
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message });
    }
};

module.exports = {
    criarReserva,
    listarReservas,
    buscarReservaPorId,
    atualizarReserva,
    deletarReserva,
};