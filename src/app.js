const express = require('express');
const app = express();

app.use(express.json());

const tipoQuartoRoutes = require('./routes/tipoQuarto.routes');
const quartoRoutes = require('./routes/quarto.routes');
const clienteRoutes = require('./routes/cliente.routes');
const reservaRoutes = require('./routes/reserva.routes');
const usuarioRoutes = require('./routes/usuario.routes'); // Nova rota de usuário/autenticação

app.use('/api', tipoQuartoRoutes);
app.use('/api', quartoRoutes);
app.use('/api', clienteRoutes);
app.use('/api', reservaRoutes);
app.use('/api/usuarios', usuarioRoutes); // Nova rota de usuário/autenticação

app.get('/', (req, res) => {
    res.send('Bem-vindo ao Hotel Senac!');
});

module.exports = app;