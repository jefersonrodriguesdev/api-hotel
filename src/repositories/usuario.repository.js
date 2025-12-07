import db from '../database/index.js';

const findAll = async () => {
  const query = 'SELECT id, nome, email, telefone, google_id FROM usuarios';
  const { rows } = await db.query(query);
  return rows;
};

const findByEmail = async (email) => {
    const query = 'SELECT * FROM usuarios WHERE email = $1';
    const { rows } = await db.query(query, [email]);
    return rows[0];
};

const findById = async (id) => {
    const query = 'SELECT * FROM usuarios WHERE id = $1';
    const { rows } = await db.query(query, [id]);
    return rows[0];
};


const findByGoogleId = async (googleId) => {
    const query = 'SELECT * FROM usuarios WHERE google_id = $1';
    const { rows } = await db.query(query, [googleId]);
    return rows[0];
};

const create = async (dados) => {
    
    const query = `
        INSERT INTO usuarios (nome, email, telefone, senha, google_id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;
    const values = [
        dados.nome, 
        dados.email, 
        dados.telefone || null, 
        dados.senha || null, 
        dados.googleId || null
    ];
    
    const { rows } = await db.query(query, values);
    return rows[0];
};

const updateGoogleId = async (id, googleId) => {
    const query = 'UPDATE usuarios SET google_id = $1 WHERE id = $2 RETURNING *';
    const { rows } = await db.query(query, [googleId, id]);
    return rows[0];
};

export default { findAll, findByEmail, findById, findByGoogleId, create, updateGoogleId };