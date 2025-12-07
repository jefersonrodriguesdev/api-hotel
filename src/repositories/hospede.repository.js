import db from '../database/index.js';

const create = async (dados) => {
  const query = `
    INSERT INTO hospedes (nome, cpf, telefone, email)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [dados.nome, dados.cpf, dados.telefone, dados.email];
  const { rows } = await db.query(query, values);
  return rows[0];
};

const findAll = async () => {
  const { rows } = await db.query('SELECT * FROM hospedes');
  return rows;
};

const findById = async (id) => {
  const { rows } = await db.query('SELECT * FROM hospedes WHERE id = $1', [id]);
  return rows[0];
};

const update = async (id, dados) => {
  const query = `
    UPDATE hospedes
    SET nome = $1, cpf = $2, telefone = $3, email = $4
    WHERE id = $5
    RETURNING *;
  `;
  const values = [dados.nome, dados.cpf, dados.telefone, dados.email, id];
  const { rows } = await db.query(query, values);
  return rows[0];
};

const remove = async (id) => {
  const { rowCount } = await db.query('DELETE FROM hospedes WHERE id = $1', [id]);
  return rowCount > 0;
};

export default { create, findAll, findById, update, remove };