// models/LaboratoryExam.model.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const LaboratoryExam = sequelize.define('LaboratoryExam', {
    laboratory_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    exam_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    tableName: 'laboratory_exams', // Nom de la table dans la base de données
    timestamps: true, // Ajoute createdAt et updatedAt automatiquement
    createdAt: 'created_at', // Nom du champ pour createdAt
    updatedAt: 'updated_at' // Nom du champ pour updatedAt
});

module.exports = LaboratoryExam;
