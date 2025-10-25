const jwt = require('jsonwebtoken');
const secret = 'seu-segredo-super-secreto-para-o-jwt'; 

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Token de autenticação não fornecido." });
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2) {
        return res.status(401).json({ message: "Erro no formato do token." });
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).json({ message: "Token mal formatado." });
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Token inválido ou expirado." });
        }

        req.usuarioId = decoded.id; // Adiciona o ID do usuário na requisição
        return next();
    });
};

module.exports = authMiddleware;