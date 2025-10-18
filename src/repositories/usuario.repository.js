const { clientes, CadastrarCliente } = require('../data/database');

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
        dadosCliente.senha // Senha já virá com hash do serviço
    );

    clientes.push(novoCliente);
    return Promise.resolve(novoCliente);
};

module.exports = { findByEmail, create };