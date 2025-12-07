import db from '../database/index.js';

const create = async (dados) => {
  const query = `
    INSERT INTO estadias 
    (id_cliente, numero_quarto, valor_diaria, data_entrada)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  
  const values = [
    dados.clienteId,
    dados.numeroQuarto,
    dados.valorDiaria,
    dados.dataEntrada
  ];

  const { rows } = await db.query(query, values);
  return rows[0];
};

const findAll = async () => {
  const { rows } = await db.query('SELECT * FROM estadias');
  return rows;
};

const findById = async (id) => {
  const { rows } = await db.query(
    'SELECT * FROM estadias WHERE id = $1',
    [id]
  );
  return rows[0];
};

const update = async (id, dados) => {
  const query = `
    UPDATE estadias 
    SET data_saida = $1, valor_total = $2, dias_cobrados = $3
    WHERE id = $4
    RETURNING *;
  `;

  const values = [
    dados.dataSaida,
    dados.valorTotal,
    dados.diasCobrados,
    id
  ];

  const { rows } = await db.query(query, values);
  return rows[0];
};

export default { create, findAll, findById, update };
