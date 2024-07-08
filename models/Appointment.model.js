// models/Appointment.model.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('../models/User.model');
const MedicalService = require('../models/MedicalService.model');
const LaboratoryExam = require('../models/LaboratoryExam.model');
const MedicalInstitution = require('../models/MedicalInstitution.model');

const Appointment = sequelize.define('Appointment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  datetime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'cancelled', 'completed'),
    allowNull: false,
    defaultValue: 'pending',
  },
  patientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  doctorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  medicalServiceId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: MedicalService,
      key: 'id',
    },
  },
  laboratoryExamId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: LaboratoryExam,
      key: 'id',
    },
  },
  medicalInstitutionId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: MedicalInstitution,
      key: 'id',
    },
  },
}, {
  tableName: 'appointments', // Nom de la table dans la base de données
  timestamps: true, // Ajoute createdAt et updatedAt automatiquement
  createdAt: 'created_at', // Nom du champ pour createdAt
  updatedAt: 'updated_at' // Nom du champ pour updatedAt
});

// Un rendez-vous appartient à un patient (User)
Appointment.belongsTo(User, { as: 'patient', foreignKey: 'patientId' });

// Un rendez-vous appartient à un praticien (User)
Appointment.belongsTo(User, { as: 'doctor', foreignKey: 'doctorId' });

// Un rendez-vous peut être lié à un service médical spécifique
Appointment.belongsTo(MedicalService, { foreignKey: 'medicalServiceId' });

// Un rendez-vous peut être lié à un examen de laboratoire
Appointment.belongsTo(LaboratoryExam, { foreignKey: 'laboratoryExamId' });

// Un rendez-vous peut être lié à une institution médicale
Appointment.belongsTo(MedicalInstitution, { foreignKey: 'medicalInstitutionId' });

module.exports = Appointment;
