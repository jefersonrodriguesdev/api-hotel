import { tipoQuarto } from '../data/database.js';

const findByTipo = async (tipo) => {
    const tipoInfo = tipoQuarto.find(tq => tq.tipo === tipo);
    return Promise.resolve(tipoInfo);
};

export default { findByTipo };