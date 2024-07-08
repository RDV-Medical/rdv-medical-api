// controllers/appointmentsController.js

const { Op } = require('sequelize');
const Appointment = require('../models/Appointment.model');
const handleSequelizeError = require('../middlewares/handleSequelizeError');
const User = require('../models/User.model');
const MedicalService = require('../models/MedicalService.model');
const LaboratoryExam = require('../models/LaboratoryExam.model');
const MedicalInstitution = require('../models/MedicalInstitution.model');

// Route pour récupérer tous les rendez-vous
const getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.findAll({
            include: [
                { model: User, as: 'patient' },
                { model: User, as: 'doctor' },
                { model: MedicalService },
                { model: LaboratoryExam },
                { model: MedicalInstitution }
            ]
        });
        res.json(appointments);
    } catch (error) {
        handleSequelizeError(res, error);
    }
};

// Route pour récupérer un rendez-vous par ID
const getAppointmentById = async (req, res) => {
    const { id } = req.params;
    try {
        const appointment = await Appointment.findByPk(id, {
            include: [
                { model: User, as: 'patient' },
                { model: User, as: 'doctor' },
                { model: MedicalService },
                { model: LaboratoryExam },
                { model: MedicalInstitution }
            ]
        });
        if (appointment) {
            res.json(appointment);
        } else {
            res.status(404).json({ message: 'Rendez-vous non trouvé' });
        }
    } catch (error) {
        handleSequelizeError(res, error);
    }
};

// Route pour créer un nouveau rendez-vous
const createAppointment = async (req, res) => {
    const { datetime, status, patientId, doctorId, medicalServiceId, laboratoryExamId, medicalInstitutionId } = req.body;
    try {
        const newAppointment = await Appointment.create({
            datetime, status, patientId, doctorId, medicalServiceId, laboratoryExamId, medicalInstitutionId
        });
        res.status(201).json(newAppointment);
    } catch (error) {
        handleSequelizeError(res, error);
    }
};

// Route pour mettre à jour un rendez-vous
const updateAppointment = async (req, res) => {
    const { id } = req.params;
    const { datetime, status, patientId, doctorId, medicalServiceId, laboratoryExamId, medicalInstitutionId } = req.body;
    try {
        const appointment = await Appointment.findByPk(id);
        if (appointment) {
            await appointment.update({
                datetime, status, patientId, doctorId, medicalServiceId, laboratoryExamId, medicalInstitutionId
            });
            res.json(appointment);
        } else {
            res.status(404).json({ message: 'Rendez-vous non trouvé' });
        }
    } catch (error) {
        handleSequelizeError(res, error);
    }
};

// Route pour supprimer un rendez-vous
const deleteAppointment = async (req, res) => {
    const { id } = req.params;
    try {
        const appointment = await Appointment.findByPk(id);
        if (appointment) {
            await appointment.destroy();
            res.json({ message: 'Rendez-vous supprimé' });
        } else {
            res.status(404).json({ message: 'Rendez-vous non trouvé' });
        }
    } catch (error) {
        handleSequelizeError(res, error);
    }
};

// Exportation des méthodes du contrôleur des rendez-vous
module.exports = {
    getAppointments,
    getAppointmentById,
    createAppointment,
    updateAppointment,
    deleteAppointment,
};
