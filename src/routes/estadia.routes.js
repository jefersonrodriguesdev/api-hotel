import express from 'express';
import estadiaController from '../controllers/estadia.controller.js';
import relatorioController from '../controllers/relatorio.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

// Protege rotas de estadia e relatórios
router.use('/estadias', authMiddleware);
router.use('/relatorios', authMiddleware);

// --- Rotas de Estadia ---
router.post('/estadias/checkin', estadiaController.checkin);
router.post('/estadias/checkout', estadiaController.checkout);

// --- Rota de Relatório ---
// Exemplo de uso: GET /api/relatorios/estadias?mes=12&ano=2025
router.get('/relatorios/estadias', relatorioController.listar);

export default router;