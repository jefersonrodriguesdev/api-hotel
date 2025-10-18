const { tipoQuarto } = require('../data/database');

const findByTipo = async (tipo) => {
    const tipoInfo = tipoQuarto.find(tq => tq.tipo === tipo);
    return Promise.resolve(tipoInfo);
};

module.exports = { findByTipo };