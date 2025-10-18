const { quartosAtivos } = require('../data/database');

const findByNumero = async (numero) => {
    const quarto = quartosAtivos.find(q => q.numero === numero);
    return Promise.resolve(quarto);
};

module.exports = { findByNumero };