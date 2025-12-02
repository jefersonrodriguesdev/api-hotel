import db from '../database/index.js'; // Importa a conexão que criamos no passo 2

const create = async (dados) => {
    // Comando SQL (Insert)
    // $1, $2, etc são variáveis de segurança para evitar SQL Injection
    const query = `
        INSERT INTO hospedes (nome, cpf, telefone, email)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;
    
    const values = [dados.nome, dados.cpf, dados.telefone, dados.email];
    
    const { rows } = await db.query(query, values);
    
    // Retorna o primeiro item criado (que veio do RETURNING *)
    return rows[0];
};

const findAll = async () => {
    const query = 'SELECT * FROM hospedes';
    const { rows } = await db.query(query);
    return rows;
};

// ... e assim por diante para update e delete ...
export default { create, findAll };