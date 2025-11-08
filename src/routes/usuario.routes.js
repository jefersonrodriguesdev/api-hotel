import express from 'express';
import usuarioController from '../controllers/usuario.controller.js';

const router = express.Router();

// Rotas públicas
router.post('/registrar', usuarioController.registrar);
router.post('/login', usuarioController.login);

export default router;