import express from 'express';
import usuarioController from '../controllers/usuario.controller.js';
// GARANTA QUE O 'authMiddleware' NÃO ESTÁ A SER IMPORTADO AQUI

const router = express.Router();

// GARANTA QUE NÃO EXISTE 'router.use(authMiddleware)' AQUI

// Rotas públicas
router.post('/registrar', usuarioController.registrar);
router.post('/login', usuarioController.login);

export default router;