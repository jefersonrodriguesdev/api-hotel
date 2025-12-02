import db from '../database/index.js';

const findByEmail = async (email) => {
    // Busca usuário pelo email
    const query = 'SELECT * FROM usuarios WHERE email = $1';
    const { rows } = await db.query(query, [email]);
    return rows[0];
};

const findById = async (id) => {
    // Busca usuário pelo ID
    const query = 'SELECT * FROM usuarios WHERE id = $1';
    const { rows } = await db.query(query, [id]);
    return rows[0];
};

const create = async (dados) => {
    // Insere novo usuário e retorna os dados criados (RETURNING *)
    const query = `
        INSERT INTO usuarios (nome, email, telefone, senha)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;
    const values = [dados.nome, dados.email, dados.telefone, dados.senha];
    
    const { rows } = await db.query(query, values);
    return rows[0];
};

export default { findByEmail, findById, create };