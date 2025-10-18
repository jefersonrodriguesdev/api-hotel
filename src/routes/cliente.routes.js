const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const { clientes } = require('../data/database');

// Aplica o middleware de autenticação a todas as rotas deste arquivo
router.use('/clientes', authMiddleware);

// Rota para listar todos os clientes
router.get('/clientes', (req, res) => {
    // Retorna a lista de clientes sem o campo da senha
    const clientesSemSenha = clientes.map(c => {
        const { senha, ...cliente } = c;
        return cliente;
    });
    res.status(200).json(clientesSemSenha);
});

// Rota para buscar um cliente pelo ID
router.get('/clientes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const clienteEncontrado = clientes.find(c => c.id === id);

    if (!clienteEncontrado) {
        return res.status(404).json({ message: "Cliente não encontrado." });
    }
    
    // Remove a senha antes de enviar a resposta
    const { senha, ...cliente } = clienteEncontrado;
    res.status(200).json(cliente);
});

// Rota para atualizar um cliente (Ex: telefone)
router.put('/clientes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = clientes.findIndex(c => c.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Cliente não encontrado." });
    }

    // Apenas alguns campos podem ser atualizados por um admin
    const { nome, telefone } = req.body;
    if (!nome || !telefone) {
        return res.status(400).json({ message: "Nome e telefone são obrigatórios para atualização." });
    }

    const clienteOriginal = clientes[index];
    const clienteAtualizado = { ...clienteOriginal, nome, telefone };
    clientes[index] = clienteAtualizado;

    const { senha, ...clienteRetorno } = clienteAtualizado;
    res.status(200).json({ message: "Cliente atualizado com sucesso!", cliente: clienteRetorno });
});

// Rota para deletar um cliente
router.delete('/clientes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = clientes.findIndex(c => c.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Cliente não encontrado." });
    }

    clientes.splice(index, 1);
    res.status(200).json({ message: "Cliente deletado com sucesso." });
});

module.exports = router;