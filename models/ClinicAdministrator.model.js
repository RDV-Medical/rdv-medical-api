// models/ClinicAdministrator.model.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Clinic = require('./Clinic.model');
const User = require('./User.model');

const ClinicAdministrator = sequelize.define('ClinicAdministrator', {
    clinicId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Clinic, // Table référencée
            key: 'id'       // Clé primaire de la table référencée
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,  // Table référencée
            key: 'id'       // Clé primaire de la table référencée
        }
    }
}, {
    // Options du modèle
    tableName: 'clinic_administrators', // Nom de la table dans la base de données
    timestamps: true,                   // Ajoute les champs `createdAt` et `updatedAt`
});

ClinicAdministrator.belongsTo(Clinic, { foreignKey: 'clinicId' });
ClinicAdministrator.belongsTo(User, { foreignKey: 'userId' });

module.exports = ClinicAdministrator;
