const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

const authenticateTokenMiddleware = (req, res, next) => {
    // Récupérer l'en-tête Authorization de la requête
    const authHeader = req.headers['authorization'];
    
    // Extraire le token JWT de l'en-tête Authorization
    const token = authHeader && authHeader.split(' ')[1];

    // Vérifier si le token est présent
    if (token == null) {
        return res.sendStatus(401); // 401 Unauthorized si le token est manquant
    }

    // Vérifier et décoder le token JWT
    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.sendStatus(403); // 403 Forbidden si le token n'est pas valide
        }
        
        // Si le token est valide, attacher les données utilisateur décryptées à l'objet req
        req.user = user;
        next(); // Passer à l'exécution du prochain middleware ou de la route handler
    });
};

module.exports = authenticateTokenMiddleware;
