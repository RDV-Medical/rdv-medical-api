// models/Laboratory.model.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Laboratory = sequelize.define('Laboratory', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    location: {
        type: DataTypes.GEOMETRY('POINT'), // Utilisation de GEOMETRY avec le type POINT
        allowNull: true
    },
    responsibleName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    isApproved: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    tableName: 'laboratories', // Nom de la table dans la base de données
    timestamps: true, // Ajoute createdAt et updatedAt automatiquement
    createdAt: 'created_at', // Nom du champ pour createdAt
    updatedAt: 'updated_at' // Nom du champ pour updatedAt
});

module.exports = Laboratory;
