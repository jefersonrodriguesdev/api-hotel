import express from 'express';
import hospedeController from '../controllers/hospede.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

// Protege todas as rotas de hóspedes
router.use('/hospedes', authMiddleware);

router.post('/hospedes', hospedeController.criar);
router.get('/hospedes', hospedeController.listar);
router.put('/hospedes/:id', hospedeController.atualizar);
router.delete('/hospedes/:id', hospedeController.deletar);

export default router;