const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

if (!secretKey) {
    throw new Error('JWT_SECRET is not defined in environment variables');
}

const authMiddleware = (req, res, next) => {
    // Récupérer l'en-tête Authorization de la requête
    const authHeader = req.headers['authorization'];
    
    // Extraire le token JWT de l'en-tête Authorization
    const token = authHeader && authHeader.split(' ')[1];

    // Vérifier si le token est présent
    if (token == null) {
        return res.status(401).json({ message: 'Token manquant' }); // 401 Unauthorized si le token est manquant
    }

    // Vérifier et décoder le token JWT
    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            let message;
            if (err.name === 'TokenExpiredError') {
                message = 'Le token a expiré';
            } else if (err.name === 'JsonWebTokenError') {
                message = 'Token invalide';
            } else if (err.name === 'NotBeforeError') {
                message = 'Le token n\'est pas encore valide';
            } else {
                message = 'Erreur de vérification du token';
            }
            return res.status(403).json({ message }); // 403 Forbidden si le token n'est pas valide
        }
        
        // Si le token est valide, attacher les données utilisateur décryptées à l'objet req
        req.user = user;
        next(); // Passer à l'exécution du prochain middleware ou de la route handler
    });
};

module.exports = authMiddleware;
