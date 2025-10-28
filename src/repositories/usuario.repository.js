import { clientes, CadastrarCliente } from '../data/database.js';

const findByEmail = async (email) => {
    const cliente = clientes.find(c => c.email === email);
    return Promise.resolve(cliente);
};

const create = async (dadosCliente) => {
    const id = clientes.length > 0 ? clientes[clientes.length - 1].id + 1 : 1;
    
    const novoCliente = new CadastrarCliente(
        id,
        dadosCliente.nome,
        dadosCliente.email,
        dadosCliente.telefone,
        dadosCliente.senha
    );

    clientes.push(novoCliente);
    return Promise.resolve(novoCliente);
};

export default { findByEmail, create };