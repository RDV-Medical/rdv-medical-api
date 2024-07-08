// models/ExamType.model.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ExamType = sequelize.define('ExamType', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'exam_types', // Nom de la table dans la base de données
    timestamps: true, // Ajoute createdAt et updatedAt automatiquement
    createdAt: 'created_at', // Nom du champ pour createdAt
    updatedAt: 'updated_at' // Nom du champ pour updatedAt
});

module.exports = ExamType;
