// models/User.model.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    role: {
        type: DataTypes.ENUM('Patient', 'Doctor', 'Admin1', 'Admin2', 'Admin0'),
        allowNull: false,
        defaultValue: 'Patient'
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    resetPasswordToken: {
        type: DataTypes.STRING,
        allowNull: true
    },
    resetPasswordExpires: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'users', // Nom de la table dans la base de données
    timestamps: true, // Ajoute createdAt et updatedAt automatiquement
    createdAt: 'created_at', // Nom du champ pour createdAt
    updatedAt: 'updated_at' // Nom du champ pour updatedAt
});

module.exports = User;
