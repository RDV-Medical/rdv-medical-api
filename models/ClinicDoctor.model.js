// models/ClinicDoctor.model.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Clinic = require('./Clinic.model');
const User = require('./User.model');
const Doctor = require('./Doctor.model');

const ClinicDoctor = sequelize.define('ClinicDoctor', {
    doctorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Doctor, // Table référencée
            key: 'id'      // Clé primaire de la table référencée
        }
    },
    clinicId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Clinic, // Table référencée
            key: 'id'      // Clé primaire de la table référencée
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,   // Table référencée
            key: 'id'      // Clé primaire de la table référencée
        }
    }
}, {
    // Options du modèle
    tableName: 'clinic_doctors', // Nom de la table dans la base de données
    timestamps: true,            // Ajoute les champs `createdAt` et `updatedAt`
});

ClinicDoctor.belongsTo(Doctor, { foreignKey: 'doctorId' });
ClinicDoctor.belongsTo(Clinic, { foreignKey: 'clinicId' });
ClinicDoctor.belongsTo(User, { foreignKey: 'userId' });

module.exports = ClinicDoctor;
