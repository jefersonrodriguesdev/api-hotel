import ApiError from '../errors/ApiError.js';

const errorHandler = (err, req, res, next) => {
    console.error(`[ERRO] ${err.statusCode || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    console.error(err.stack);

    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({ message: err.message });
    }

    return res.status(500).json({ message: "Ocorreu um erro interno no servidor." });
};

export default errorHandler;