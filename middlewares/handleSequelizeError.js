const { ValidationError, UniqueConstraintError, ForeignKeyConstraintError, DatabaseError, ConnectionError, TimeoutError } = require('sequelize');

// Middleware pour gérer les erreurs de Sequelize
const handleSequelizeError = (res, error) => {
    console.error("Erreur:", error);
    
    if (error instanceof ValidationError) {
        return res.status(400).json({ erreur: error.errors.map(e => e.message) });
    } else if (error instanceof UniqueConstraintError) {
        return res.status(400).json({ erreur: 'Entrée dupliquée' });
    } else if (error instanceof ForeignKeyConstraintError) {
        return res.status(400).json({ erreur: 'Échec de la contrainte de clé étrangère' });
    } else if (error instanceof DatabaseError) {
        return res.status(500).json({ erreur: 'Erreur de la base de données' });
    } else if (error instanceof ConnectionError) {
        return res.status(500).json({ erreur: 'Erreur de connexion à la base de données' });
    } else if (error instanceof TimeoutError) {
        return res.status(500).json({ erreur: 'Temps de connexion écoulé' });
    }
    
    res.status(500).json({ erreur: 'Une erreur est survenue!' });
};

module.exports = handleSequelizeError;
