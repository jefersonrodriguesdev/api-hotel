import express from 'express';
import usuarioController from '../controllers/usuario.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/registrar', usuarioController.registrar);
router.post('/login', usuarioController.login);

router.get('/', authMiddleware, usuarioController.listar);

export default router;
