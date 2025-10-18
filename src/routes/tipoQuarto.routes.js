const express = require('express');
const router = express.Router();
// Implemente o controller de tipoQuarto seguindo o padrão dos outros
// const tipoQuartoController = require('../controllers/tipoQuarto.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Simulação de um controller para simplificar
const { tipoQuarto } = require('../data/database');

// Protegendo rotas de gerenciamento
router.use('/tipos-quarto', authMiddleware);

router.post('/tipos-quarto', (req, res) => {
    const { tipo, capacidade, descricao } = req.body;
    const id = tipoQuarto.length > 0 ? tipoQuarto[tipoQuarto.length - 1].id + 1 : 1;
    const novoTipo = { id, tipo, capacidade, descricao };
    tipoQuarto.push(novoTipo);
    res.status(201).json(novoTipo);
});

router.get('/tipos-quarto', (req, res) => {
    res.status(200).json(tipoQuarto);
});

module.exports = router;