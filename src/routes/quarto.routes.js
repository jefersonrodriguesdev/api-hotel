const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const { quartosAtivos } = require('../data/database');
const { tipoQuarto } = require('../data/database'); // Para validar o tipo de quarto

// Aplica o middleware de autenticação a todas as rotas deste arquivo
router.use('/quartos', authMiddleware);

// Rota para criar um novo quarto
router.post('/quartos', (req, res) => {
    const { numero, tipo, valorDiaria, status } = req.body;

    if (!numero || !tipo || !valorDiaria || !status) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    // Validação: verifica se o número do quarto já existe
    if (quartosAtivos.some(q => q.numero === numero)) {
        return res.status(409).json({ message: `O quarto número ${numero} já está cadastrado.` });
    }

    // Validação: verifica se o tipo de quarto informado existe
    if (!tipoQuarto.some(tq => tq.tipo === tipo)) {
        return res.status(400).json({ message: `O tipo de quarto '${tipo}' é inválido.` });
    }

    const novoQuarto = { numero, tipo, valorDiaria, status };
    quartosAtivos.push(novoQuarto);

    res.status(201).json({ message: "Quarto criado com sucesso!", quarto: novoQuarto });
});

// Rota para listar todos os quartos
router.get('/quartos', (req, res) => {
    res.status(200).json(quartosAtivos);
});

// Rota para buscar um quarto pelo número
router.get('/quartos/:numero', (req, res) => {
    const numero = parseInt(req.params.numero);
    const quarto = quartosAtivos.find(q => q.numero === numero);

    if (!quarto) {
        return res.status(404).json({ message: "Quarto não encontrado." });
    }

    res.status(200).json(quarto);
});

// Rota para atualizar um quarto
router.put('/quartos/:numero', (req, res) => {
    const numero = parseInt(req.params.numero);
    const index = quartosAtivos.findIndex(q => q.numero === numero);

    if (index === -1) {
        return res.status(404).json({ message: "Quarto não encontrado." });
    }

    const { tipo, valorDiaria, status } = req.body;
    if (!tipo || !valorDiaria || !status) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios para atualização." });
    }
    
    const quartoAtualizado = { ...quartosAtivos[index], tipo, valorDiaria, status };
    quartosAtivos[index] = quartoAtualizado;

    res.status(200).json({ message: "Quarto atualizado com sucesso!", quarto: quartoAtualizado });
});

// Rota para deletar um quarto
router.delete('/quartos/:numero', (req, res) => {
    const numero = parseInt(req.params.numero);
    const index = quartosAtivos.findIndex(q => q.numero === numero);

    if (index === -1) {
        return res.status(404).json({ message: "Quarto não encontrado." });
    }

    quartosAtivos.splice(index, 1);
    res.status(200).json({ message: "Quarto deletado com sucesso." });
});

module.exports = router;