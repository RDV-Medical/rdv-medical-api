// models/MedicalService.model.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Clinic = require('./Clinic.model');

const MedicalService = sequelize.define('MedicalService', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    price: {
        type: DataTypes.DECIMAL(10, 2), // DECIMAL with precision 10 and scale 2 for price
        allowNull: false
    },
    clinicId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Clinic,
            key: 'id'
        }
    }
}, {
    tableName: 'medical_services', // Nom de la table dans la base de données
    timestamps: true, // Ajoute createdAt et updatedAt automatiquement
    createdAt: 'created_at', // Nom du champ pour createdAt
    updatedAt: 'updated_at' // Nom du champ pour updatedAt
});

// Association avec la clinique (Many-to-One)
MedicalService.belongsTo(Clinic, {
    foreignKey: 'clinicId',
    onDelete: 'CASCADE'
});

module.exports = MedicalService;
