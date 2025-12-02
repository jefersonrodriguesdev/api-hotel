import db from '../database/index.js';

const findByNumero = async (numero) => {
    // Mapeamos o retorno para camelCase para não quebrar seu front/controller
    const query = 'SELECT * FROM quartos WHERE numero = $1';
    const { rows } = await db.query(query, [numero]);
    
    if (!rows[0]) return null;
    
    return {
        numero: rows[0].numero,
        tipo: rows[0].tipo,
        valorDiaria: rows[0].valor_diaria, // Mapeamento manual
        status: rows[0].status
    };
};

const create = async (dados) => {
    const query = `
        INSERT INTO quartos (numero, tipo, valor_diaria, status)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;
    const values = [dados.numero, dados.tipo, dados.valorDiaria, dados.status];
    
    const { rows } = await db.query(query, values);
    
    return {
        numero: rows[0].numero,
        tipo: rows[0].tipo,
        valorDiaria: rows[0].valor_diaria,
        status: rows[0].status
    };
};

const findAll = async () => {
    const query = 'SELECT * FROM quartos';
    const { rows } = await db.query(query);
    
    // Mapeia todos os resultados
    return rows.map(row => ({
        numero: row.numero,
        tipo: row.tipo,
        valorDiaria: row.valor_diaria,
        status: row.status
    }));
};

// Métodos de update/delete seguem a mesma lógica...
// Vou incluir o Update pois é usado para mudar status
const update = async (numero, dados) => {
    const query = `
        UPDATE quartos 
        SET tipo = $1, valor_diaria = $2, status = $3
        WHERE numero = $4
        RETURNING *;
    `;
    const values = [dados.tipo, dados.valorDiaria, dados.status, numero];
    const { rows } = await db.query(query, values);
    return rows[0] ? {
        numero: rows[0].numero,
        tipo: rows[0].tipo,
        valorDiaria: rows[0].valor_diaria,
        status: rows[0].status
    } : null;
};

const remove = async (numero) => {
    const query = 'DELETE FROM quartos WHERE numero = $1';
    await db.query(query, [numero]);
    return true;
}

export default { findByNumero, create, findAll, update, remove };