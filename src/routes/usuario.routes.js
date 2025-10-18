const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');

// Rotas públicas, não precisam de autenticação
router.post('/registrar', usuarioController.registrar);
router.post('/login', usuarioController.login);

module.exports = router;