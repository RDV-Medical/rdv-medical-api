// models/MedicalInstitution.model.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const MedicalInstitution = sequelize.define('MedicalInstitution', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'medical_institutions', // Nom de la table dans la base de données
    timestamps: true, // Ajoute createdAt et updatedAt automatiquement
    createdAt: 'created_at', // Nom du champ pour createdAt
    updatedAt: 'updated_at' // Nom du champ pour updatedAt
});

module.exports = MedicalInstitution;
