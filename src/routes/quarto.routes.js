const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const { quartosAtivos, tipoQuarto } = require('../data/database');
const ApiError = require('../errors/ApiError'); // Importa o ApiError

router.use('/quartos', authMiddleware);

router.post('/quartos', (req, res) => {
    const { numero, tipo, valorDiaria, status } = req.body;

    if (!numero || !tipo || !valorDiaria || !status) {
        throw new ApiError("Todos os campos são obrigatórios.", 400);
    }
    if (quartosAtivos.some(q => q.numero === numero)) {
        throw new ApiError(`O quarto número ${numero} já está cadastrado.`, 409);
    }
    if (!tipoQuarto.some(tq => tq.tipo === tipo)) {
        throw new ApiError(`O tipo de quarto '${tipo}' é inválido.`, 400);
    }

    const novoQuarto = { numero, tipo, valorDiaria, status };
    quartosAtivos.push(novoQuarto);
    res.status(201).json({ message: "Quarto criado com sucesso!", quarto: novoQuarto });
});

router.get('/quartos', (req, res) => {
    res.status(200).json(quartosAtivos);
});

router.get('/quartos/:numero', (req, res) => {
    const numero = parseInt(req.params.numero);
    const quarto = quartosAtivos.find(q => q.numero === numero);
    if (!quarto) {
        throw new ApiError("Quarto não encontrado.", 404);
    }
    res.status(200).json(quarto);
});

router.put('/quartos/:numero', (req, res) => {
    const numero = parseInt(req.params.numero);
    const index = quartosAtivos.findIndex(q => q.numero === numero);
    if (index === -1) {
        throw new ApiError("Quarto não encontrado.", 404);
    }

    const { tipo, valorDiaria, status } = req.body;
    if (!tipo || !valorDiaria || !status) {
        throw new ApiError("Todos os campos são obrigatórios para atualização.", 400);
    }
    
    const quartoAtualizado = { ...quartosAtivos[index], tipo, valorDiaria, status };
    quartosAtivos[index] = quartoAtualizado;
    res.status(200).json({ message: "Quarto atualizado com sucesso!", quarto: quartoAtualizado });
});

router.delete('/quartos/:numero', (req, res) => {
    const numero = parseInt(req.params.numero);
    const index = quartosAtivos.findIndex(q => q.numero === numero);
    if (index === -1) {
        throw new ApiError("Quarto não encontrado.", 404);
    }
    quartosAtivos.splice(index, 1);
    res.status(200).json({ message: "Quarto deletado com sucesso." });
});

module.exports = router;