import db from '../database/index.js';

const findByTipo = async (tipo) => {
    const query = 'SELECT * FROM tipos_quarto WHERE tipo = $1';
    const { rows } = await db.query(query, [tipo]);
    return rows[0];
};

const create = async (dados) => {
    // Evita erro se tentar criar duplicado, ou você pode deixar o erro estourar (409)
    const query = `
        INSERT INTO tipos_quarto (tipo, capacidade, descricao)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;
    const values = [dados.tipo, dados.capacidade, dados.descricao];
    
    const { rows } = await db.query(query, values);
    return rows[0];
};

const findAll = async () => {
    const query = 'SELECT * FROM tipos_quarto';
    const { rows } = await db.query(query);
    return rows;
};

// Se você tiver update/delete, seria similar
export default { findByTipo, create, findAll };