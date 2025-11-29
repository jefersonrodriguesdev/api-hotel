import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;

// A string de conexão vem do .env ou montamos com os dados
// Formato: postgres://usuario:senha@host:porta/banco
const pool = new Pool({
    user: 'admin',
    password: 'admin_password',
    host: 'localhost', 
    port: 5432,
    database: 'hotel_db',
    // Se estiver rodando o Node FORA do Docker e o banco DENTRO, use 'localhost'.
    // Se ambos estiverem no Docker, usaria o nome do container 'postgres_db'.
});

// Teste de conexão simples
pool.on('connect', () => {
    console.log('Base de Dados conectada com sucesso!');
});

export default {
    query: (text, params) => pool.query(text, params),
};