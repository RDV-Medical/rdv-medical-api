// models/Clinic.model.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Clinic = sequelize.define('Clinic', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    location: {
        type: DataTypes.GEOMETRY('POINT'), // Utilisation de GEOMETRY avec le type POINT
        allowNull: true
    },
}, {
    tableName: 'clinics', // Nom de la table dans la base de données
    timestamps: true, // Ajoute createdAt et updatedAt automatiquement
    createdAt: 'created_at', // Nom du champ pour createdAt
    updatedAt: 'updated_at' // Nom du champ pour updatedAt
});

module.exports = Clinic;
