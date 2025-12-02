import db from './index.js';

const initDb = async () => {
  try {
    // 1. Usuários (Sistema)
    await db.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        senha VARCHAR(255),
        telefone VARCHAR(20),
        google_id VARCHAR(255)
      );
    `);

    // 2. Tipos de Quarto
    await db.query(`
      CREATE TABLE IF NOT EXISTS tipos_quarto (
        tipo VARCHAR(50) PRIMARY KEY,
        capacidade INTEGER NOT NULL,
        descricao TEXT
      );
    `);

    // 3. Quartos
    await db.query(`
      CREATE TABLE IF NOT EXISTS quartos (
        numero INTEGER PRIMARY KEY,
        tipo VARCHAR(50) REFERENCES tipos_quarto(tipo),
        valor_diaria DECIMAL(10, 2) NOT NULL,
        status VARCHAR(20) DEFAULT 'disponível'
      );
    `);

    // 4. Hóspedes (Aluno 2)
    await db.query(`
      CREATE TABLE IF NOT EXISTS hospedes (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        cpf VARCHAR(14) UNIQUE NOT NULL,
        telefone VARCHAR(20) NOT NULL,
        email VARCHAR(255) NOT NULL
      );
    `);

    // 5. Reservas (Aluno 1)
    await db.query(`
      CREATE TABLE IF NOT EXISTS reservas (
        id SERIAL PRIMARY KEY,
        id_cliente INTEGER NOT NULL, 
        numero_quarto INTEGER REFERENCES quartos(numero),
        quantidade_pessoas INTEGER NOT NULL,
        data_reserva TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        data_entrada DATE NOT NULL,
        data_saida DATE NOT NULL
      );
    `);

    // 6. Estadias (Aluno 2)
    await db.query(`
      CREATE TABLE IF NOT EXISTS estadias (
        id SERIAL PRIMARY KEY,
        id_cliente INTEGER REFERENCES hospedes(id),
        numero_quarto INTEGER REFERENCES quartos(numero),
        valor_diaria DECIMAL(10, 2) NOT NULL,
        data_entrada TIMESTAMP NOT NULL,
        data_saida TIMESTAMP,
        valor_total DECIMAL(10, 2),
        dias_cobrados INTEGER
      );
    `);

    console.log('Tabelas criadas com sucesso!');
    process.exit();
  } catch (error) {
    console.error('Erro ao criar tabelas:', error);
    process.exit(1);
  }
};

initDb();
