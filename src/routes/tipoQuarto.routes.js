const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const { tipoQuarto } = require('../data/database');
const ApiError = require('../errors/ApiError'); // Importa o ApiError

router.use('/tipos-quarto', authMiddleware);

router.post('/tipos-quarto', (req, res) => {
    const { tipo, capacidade, descricao } = req.body;
    if (!tipo || !capacidade || !descricao) {
        throw new ApiError("Campos 'tipo', 'capacidade' e 'descricao' são obrigatórios.", 400);
    }
    if (tipoQuarto.some(tq => tq.tipo === tipo)) {
        throw new ApiError(`O tipo de quarto '${tipo}' já existe.`, 409);
    }

    const id = tipoQuarto.length > 0 ? tipoQuarto[tipoQuarto.length - 1].id + 1 : 1;
    const novoTipo = { id, tipo, capacidade, descricao };
    tipoQuarto.push(novoTipo);
    res.status(201).json(novoTipo);
});

router.get('/tipos-quarto', (req, res) => {
    res.status(200).json(tipoQuarto);
});

module.exports = router;