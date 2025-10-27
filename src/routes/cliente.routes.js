import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import { clientes } from '../data/database.js';
import ApiError from '../errors/ApiError.js';

const router = express.Router();

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

export default router;