import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import ApiError from '../errors/ApiError.js';

const router = express.Router();
const secret = process.env.JWT_SECRET;

router.get('/google',
    passport.authenticate('google', { 
        scope: ['profile', 'email'], 
        session: false 
    })
);

// Rota de retorno (Callback)
router.get('/google/callback',
    passport.authenticate('google', { 
        failureRedirect: '/login-falhou', 
        session: false 
    }),
    (req, res) => {
        if (!req.user) {
            throw new ApiError("Falha na autenticação com Google.", 401);
        }

        const token = jwt.sign({ id: req.user.id }, secret, { expiresIn: '8h' });

        res.status(200).json({
            mensagem: "Login com Google realizado com sucesso!",
            token: token,
            usuario: {
                id: req.user.id,
                nome: req.user.nome,
                email: req.user.email
            }
        });
    }
);

export default router;