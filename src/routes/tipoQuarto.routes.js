import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import tipoQuartoController from '../controllers/tipoQuarto.controller.js';

const router = express.Router();

router.use('/tipos-quarto', authMiddleware);

router.post('/tipos-quarto', tipoQuartoController.criar);
router.get('/tipos-quarto', tipoQuartoController.listar);
router.get('/tipos-quarto/:tipo', tipoQuartoController.buscarPorTipo);

export default router;
