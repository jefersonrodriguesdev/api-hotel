// src/app.js
import express from 'express';
import 'express-async-errors';
import ApiError from './errors/ApiError.js';
import errorHandler from './middleware/errorHandler.middleware.js';

// Vamos importar TODAS as rotas primeiro
import tipoQuartoRoutes from './routes/tipoQuarto.routes.js';
import quartoRoutes from './routes/quarto.routes.js';
import clienteRoutes from './routes/cliente.routes.js';
import reservaRoutes from './routes/reserva.routes.js';
import usuarioRoutes from './routes/usuario.routes.js'; // A rota pública

const app = express();
app.use(express.json());

// 1. Registramos as rotas PÚBLICAS primeiro.
app.use('/api/usuarios', usuarioRoutes);

// 2. Registramos todas as rotas PROTEGIDAS depois.
app.use('/api', tipoQuartoRoutes);
app.use('/api', quartoRoutes);
app.use('/api', clienteRoutes);
app.use('/api', reservaRoutes);

// ---------------------------

app.get('/', (req, res) => {
    res.send('Bem-vindo ao Hotel Senac!');
});

// Middleware para lidar com rotas 404
app.use((req, res, next) => {
    next(new ApiError("Endpoint não encontrado.", 404));
});

// Middleware de Tratamento de Erro Global
app.use(errorHandler);

export default app;