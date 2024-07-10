const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

const secretKey = process.env.JWT_SECRET;

if (!secretKey) {
    throw new Error('JWT_SECRET n\'est pas défini dans les variables d\'environnement');
}

// Middleware pour vérifier le token et le rôle de l'utilisateur
const verifyTokenAndRole = (role) => {
    return async (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Extraire le token JWT de l'en-tête Authorization

        if (!token) {
            return res.status(401).json({ message: 'Token manquant' }); // 401 Unauthorized si le token est manquant
        }

        try {
            const decoded = jwt.verify(token, secretKey);
            const user = await User.findByPk(decoded.id);

            if (!user) {
                return res.status(404).json({ message: 'Utilisateur non trouvé' }); // 404 Not Found si l'utilisateur n'existe pas
            }

            if (user.role !== role) {
                return res.status(403).json({ message: `Accès interdit : seuls les utilisateurs avec le rôle "${role}" peuvent accéder à cette ressource` }); // 403 Forbidden si le rôle ne correspond pas
            }

            req.user = user; // Attacher les données utilisateur décryptées à l'objet req
            next(); // Passer à l'exécution du prochain middleware ou de la route handler
        } catch (error) {
            let message;
            switch (error.name) {
                case 'TokenExpiredError':
                    message = 'Le token a expiré';
                    break;
                case 'JsonWebTokenError':
                    message = 'Token invalide';
                    break;
                case 'NotBeforeError':
                    message = 'Le token n\'est pas encore valide';
                    break;
                default:
                    message = 'Erreur de vérification du token';
                    break;
            }
            return res.status(401).json({ message }); // 401 Unauthorized si le token est invalide
        }
    };
};

// Middleware pour vérifier un rôle spécifique (sans vérification du token)
const checkRole = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({ message: `Accès interdit : seuls les utilisateurs avec le rôle "${role}" peuvent accéder à cette ressource` }); // 403 Forbidden si le rôle ne correspond pas
        }
        next(); // Passer à l'exécution du prochain middleware ou de la route handler
    };
};

module.exports = { verifyTokenAndRole, checkRole };
