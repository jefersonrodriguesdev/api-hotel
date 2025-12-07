import 'dotenv/config';
import jwt from 'jsonwebtoken';
import ApiError from '../errors/ApiError.js'; // Importação atualizada

const secret = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        // Lança erro para o errorHandler capturar
        throw new ApiError("Token de autenticação não fornecido.", 401);
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2) {
        throw new ApiError("Erro no formato do token.", 401);
    }

    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) {
        throw new ApiError("Token mal formatado.", 401);
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            // Usa next(err) dentro de callbacks assíncronos
            return next(new ApiError("Token inválido ou expirado.", 401));
        }
        req.usuarioId = decoded.id;
        return next();
    });
};

export default authMiddleware;