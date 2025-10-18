const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reserva.controller');
const authMiddleware = require('../middleware/auth.middleware'); // Middleware de autenticação

// Todas as rotas de reserva agora exigem autenticação
router.use(authMiddleware);

router.get('/reservas', reservaController.listarReservas);
router.post('/reservas', reservaController.criarReserva);
router.get('/reservas/:id', reservaController.buscarReservaPorId);
router.put('/reservas/:id', reservaController.atualizarReserva);
router.delete('/reservas/:id', reservaController.deletarReserva);

module.exports = router;