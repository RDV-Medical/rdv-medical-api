const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Clinic = require('./Clinic.model');
const User = require('./User.model');

const Doctor = sequelize.define('Doctor', {
    speciality: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rank: {
        type: DataTypes.STRING,
        allowNull: false
    },
    clinicId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Clinic,
            key: 'id'
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    }
}, {
    tableName: 'doctors', // Nom de la table dans la base de données
    timestamps: true, // Ajoute createdAt et updatedAt automatiquement
    createdAt: 'created_at', // Nom du champ pour createdAt
    updatedAt: 'updated_at' // Nom du champ pour updatedAt
});

// Associations
Doctor.belongsTo(Clinic, { foreignKey: 'clinicId', onDelete: 'CASCADE' });
Doctor.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });

module.exports = Doctor;
