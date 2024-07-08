require('dotenv').config();
const express = require('express');
const app = express();
// Importer et utiliser le routeur des apiRoutes
const apiRoutes = require('./routes/api');
const port = 3000;

const sequelize = require('./config/database');

app.use(express.json()); // Pour parser les corps de requête JSON
app.use(express.urlencoded({ extended: true })); // Pour parser les corps de requête URL-encodés

// Synchroniser les modèles avec la base de données
sequelize.sync()
    .then(() => {
        console.log('Base de données synchronisée');
    })
    .catch(err => {
        console.error('Erreur de synchronisation de la base de données :', err);
    });

// Utilisation des apiRoutes
app.use('/api', apiRoutes);

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
