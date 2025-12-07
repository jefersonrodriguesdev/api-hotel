import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import quartoController from '../controllers/quarto.controller.js';

const router = express.Router();


router.use('/quartos', authMiddleware);


router.post('/quartos', quartoController.criar);


router.get('/quartos', quartoController.listar);


router.get('/quartos/:numero', quartoController.buscarPorNumero);


router.put('/quartos/:numero', quartoController.atualizar);


router.delete('/quartos/:numero', quartoController.deletar);

export default router;
