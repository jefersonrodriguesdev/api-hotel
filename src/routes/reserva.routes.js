import express from 'express';
import reservaController from '../controllers/reserva.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.use('/reservas', authMiddleware);

router.get('/reservas', reservaController.listarReservas);
router.post('/reservas', reservaController.criarReserva);
router.get('/reservas/:id', reservaController.buscarReservaPorId);
router.put('/reservas/:id', reservaController.atualizarReserva);
router.delete('/reservas/:id', reservaController.deletarReserva);

export default router;