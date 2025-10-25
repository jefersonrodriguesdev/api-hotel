const ApiError = require('../errors/ApiError');

const errorHandler = (err, req, res, next) => {
    // Loga o erro no console para fins de debug
    console.error(`[ERRO] ${err.statusCode || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    console.error(err.stack);

    // Se o erro for uma instância do nosso ApiError, nós confiamos no statusCode.
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({ message: err.message });
    }

    // Para erros inesperados (erros 500), enviamos uma mensagem genérica
    // para não expor detalhes sensíveis da implementação.
    return res.status(500).json({ message: "Ocorreu um erro interno no servidor." });
};

module.exports = errorHandler;