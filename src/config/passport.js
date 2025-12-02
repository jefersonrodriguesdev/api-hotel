import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import 'dotenv/config';
import usuarioRepository from '../repositories/usuario.repository.js';

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
},
async (accessToken, refreshToken, profile, done) => {
    try {
        const email = profile.emails[0].value;
        const googleId = profile.id;
        const nome = profile.displayName;

        let usuario = await usuarioRepository.findByGoogleId(googleId);
        if (usuario) {
            return done(null, usuario);
        }

        usuario = await usuarioRepository.findByEmail(email);
        if (usuario) {
            usuario = await usuarioRepository.updateGoogleId(usuario.id, googleId);
            return done(null, usuario);
        }

        const novoUsuario = await usuarioRepository.create({
            nome,
            email,
            googleId,
            senha: null, 
            telefone: null
        });
        
        return done(null, novoUsuario);

    } catch (error) {
        return done(error, false);
    }
}));