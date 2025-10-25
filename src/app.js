const express = require('express');
require('express-async-errors'); // Importa e já configura o 'express-async-errors'
const app = express();
const ApiError = require('./errors/ApiError');
const errorHandler = require('./middleware/errorHandler.middleware');

app.use(express.json());

// Importação das rotas
const tipoQuartoRoutes = require('./routes/tipoQuarto.routes');
const quartoRoutes = require('./routes/quarto.routes');
const clienteRoutes = require('./routes/cliente.routes');
const reservaRoutes = require('./routes/reserva.routes');
const usuarioRoutes = require('./routes/usuario.routes');

// Registro das rotas
app.use('/api', tipoQuartoRoutes);
app.use('/api', quartoRoutes);
app.use('/api', clienteRoutes);
app.use('/api', reservaRoutes);
app.use('/api/usuarios', usuarioRoutes);

app.get('/', (req, res) => {
    res.send('Bem-vindo ao Hotel Senac!');
});

// Middleware para lidar com rotas 404 (Não Encontrado)
// Deve ser colocado DEPOIS de todas as outras rotas
app.use((req, res, next) => {
    next(new ApiError("Endpoint não encontrado.", 404));
});

// Middleware de Tratamento de Erro Global
// Deve ser o ÚLTIMO middleware registrado no Express
app.use(errorHandler);

module.exports = app;