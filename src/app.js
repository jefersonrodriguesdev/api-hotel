import express from 'express';
import 'express-async-errors';
import passport from 'passport';
import './config/passport.js'; 
import authRoutes from './routes/auth.routes.js';

import ApiError from './errors/ApiError.js';
import errorHandler from './middleware/errorHandler.middleware.js';

import tipoQuartoRoutes from './routes/tipoQuarto.routes.js';
import quartoRoutes from './routes/quarto.routes.js';
import clienteRoutes from './routes/cliente.routes.js';
import reservaRoutes from './routes/reserva.routes.js';
import usuarioRoutes from './routes/usuario.routes.js';
import hospedeRoutes from './routes/hospede.routes.js';
import estadiaRoutes from './routes/estadia.routes.js';

const app = express();
app.use(express.json());

app.use(passport.initialize());
app.use('/api/auth', authRoutes);

app.use('/api/usuarios', usuarioRoutes);

app.use('/api', tipoQuartoRoutes);
app.use('/api', quartoRoutes);
app.use('/api', clienteRoutes);
app.use('/api', reservaRoutes);
app.use('/api', hospedeRoutes);
app.use('/api', estadiaRoutes);


app.get('/', (req, res) => {
    res.send('Bem-vindo ao Hotel Senac!');
});

app.use((req, res, next) => {
    next(new ApiError("Endpoint não encontrado.", 404));
});

app.use(errorHandler);

export default app;