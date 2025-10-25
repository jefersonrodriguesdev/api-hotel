const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const { clientes } = require('../data/database');
const ApiError = require('../errors/ApiError'); // Importa o ApiError

router.use('/clientes', authMiddleware);

router.get('/clientes', (req, res) => {
    const clientesSemSenha = clientes.map(c => {
        const { senha, ...cliente } = c;
        return cliente;
    });
    res.status(200).json(clientesSemSenha);
});

router.get('/clientes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const clienteEncontrado = clientes.find(c => c.id === id);
    if (!clienteEncontrado) {
        throw new ApiError("Cliente não encontrado.", 404);
    }
    const { senha, ...cliente } = clienteEncontrado;
    res.status(200).json(cliente);
});

router.put('/clientes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = clientes.findIndex(c => c.id === id);
    if (index === -1) {
        throw new ApiError("Cliente não encontrado.", 404);
    }

    const { nome, telefone } = req.body;
    if (!nome || !telefone) {
        throw new ApiError("Nome e telefone são obrigatórios para atualização.", 400);
    }

    const clienteOriginal = clientes[index];
    const clienteAtualizado = { ...clienteOriginal, nome, telefone };
    clientes[index] = clienteAtualizado;
    const { senha, ...clienteRetorno } = clienteAtualizado;
    res.status(200).json({ message: "Cliente atualizado com sucesso!", cliente: clienteRetorno });
});

router.delete('/clientes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = clientes.findIndex(c => c.id === id);
    if (index === -1) {
        throw new ApiError("Cliente não encontrado.", 404);
    }
    clientes.splice(index, 1);
    res.status(200).json({ message: "Cliente deletado com sucesso." });
});

module.exports = router;