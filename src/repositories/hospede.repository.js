import db from '../database/index.js';
const create = async (dados) => {
// Comando SQL para inserir um novo hóspede na tabela
const query = `
INSERT INTO hospedes (nome, cpf, telefone, email)
VALUES ($1, $2, $3, $4)
RETURNING *;
`;
// Organiza os dados que vieram do formulário
const values = [dados.nome, dados.cpf, dados.telefone, dados.email];
// Executa no banco
const { rows } = await db.query(query, values);
// Retorna o hóspede criado
return rows[0];
};
const findAll = async () => {
// Busca TODOS os hóspedes
const query = 'SELECT * FROM hospedes';
const { rows } = await db.query(query);
return rows;
};
const findById = async (id) => {
// Busca APENAS UM hóspede pelo ID
const query = 'SELECT * FROM hospedes WHERE id = $1';
const { rows } = await db.query(query, [id]);
return rows[0];
};
const update = async (id, dados) => {
// Atualiza os dados do hóspede
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
// Deleta o hóspede
const query = 'DELETE FROM hospedes WHERE id = $1';
await db.query(query, [id]);
return true;
};
export default { create, findAll, findById, update, remove };