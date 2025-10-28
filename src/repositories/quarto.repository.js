import { quartosAtivos } from '../data/database.js';

const findByNumero = async (numero) => {
    const quarto = quartosAtivos.find(q => q.numero === numero);
    return Promise.resolve(quarto);
};

export default { findByNumero };