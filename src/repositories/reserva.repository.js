import db from '../database/index.js';

const findConflito = async (numeroQuarto, dataEntrada, dataSaida, idExcecao = null) => {
    let query = `
        SELECT * FROM reservas 
        WHERE numero_quarto = $1 
        AND (data_entrada < $3 AND data_saida > $2)
    `;
    
    const values = [numeroQuarto, dataEntrada, dataSaida];

    // Se for atualização (PUT), ignoramos a própria reserva no conflito
    if (idExcecao) {
        query += ` AND id != $4`;
        values.push(idExcecao);
    }

    const { rows } = await db.query(query, values);
    return rows; // Retorna array de conflitos (se vazio, ok)
};

const create = async (dados) => {
    // Não precisamos gerar ID manual, o Postgres faz isso (SERIAL)
    const query = `
        INSERT INTO reservas (id_cliente, numero_quarto, quantidade_pessoas, data_reserva, data_entrada, data_saida)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
    `;
    
    // Atenção: id_cliente no banco vs idCliente no JS
    const values = [
        dados.idCliente, 
        dados.numeroQuarto, 
        dados.quantidadePessoas, 
        new Date(), // data_reserva
        dados.dataEntrada, 
        dados.dataSaida
    ];

    const { rows } = await db.query(query, values);
    return mapReserva(rows[0]);
};

const findAll = async () => {
    const query = 'SELECT * FROM reservas';
    const { rows } = await db.query(query);
    return rows.map(mapReserva);
};

const findById = async (id) => {
    const query = 'SELECT * FROM reservas WHERE id = $1';
    const { rows } = await db.query(query, [id]);
    return rows[0] ? mapReserva(rows[0]) : null;
};

const update = async (id, dados) => {
    const query = `
        UPDATE reservas 
        SET id_cliente = $1, numero_quarto = $2, quantidade_pessoas = $3, data_entrada = $4, data_saida = $5
        WHERE id = $6
        RETURNING *;
    `;
    const values = [
        dados.idCliente, 
        dados.numeroQuarto, 
        dados.quantidadePessoas, 
        dados.dataEntrada, 
        dados.dataSaida,
        id
    ];
    
    const { rows } = await db.query(query, values);
    return rows[0] ? mapReserva(rows[0]) : null;
};

const remove = async (id) => {
    const query = 'DELETE FROM reservas WHERE id = $1';
    await db.query(query, [id]);
    return true;
};

// Helper para converter snake_case do banco para camelCase do JS
function mapReserva(row) {
    if (!row) return null;
    return {
        id: row.id,
        idCliente: row.id_cliente,
        numeroQuarto: row.numero_quarto,
        quantidadePessoas: row.quantidade_pessoas,
        dataReserva: row.data_reserva,
        dataEntrada: row.data_entrada,
        dataSaida: row.data_saida
    };
}

export default { findConflito, create, findAll, findById, update, remove };