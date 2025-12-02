import db from './index.js';

const criarTabelas = async () => {
    const usuariosTable = `
      CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        senha VARCHAR(255) NOT NULL,
        telefone VARCHAR(20),
        google_id VARCHAR(255)
      );
    `;

    const hospedesTable = `
      CREATE TABLE IF NOT EXISTS hospedes (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        cpf VARCHAR(14) UNIQUE NOT NULL,
        telefone VARCHAR(20) NOT NULL,
        email VARCHAR(255) NOT NULL
      );
    `;

    const quartosTable = `
      CREATE TABLE IF NOT EXISTS quartos (
        numero INTEGER PRIMARY KEY,
        tipo VARCHAR(50) NOT NULL,
        valor_diaria DECIMAL(10, 2) NOT NULL,
        status VARCHAR(20) DEFAULT 'disponível'
      );
    `;

    // Adicione aqui as tabelas de Reservas e Estadias com as Foreign Keys (FK)
    
    try {
        await db.query(usuariosTable);
        console.log('Tabela Usuários criada/verificada.');
        
        await db.query(hospedesTable);
        console.log('Tabela Hóspedes criada/verificada.');
        
        await db.query(quartosTable);
        console.log('Tabela Quartos criada/verificada.');
        
        console.log('Todas as tabelas foram iniciadas!');
        process.exit(); // Encerra o script
    } catch (error) {
        console.error('Erro ao criar tabelas:', error);
        process.exit(1);
    }
};

criarTabelas();