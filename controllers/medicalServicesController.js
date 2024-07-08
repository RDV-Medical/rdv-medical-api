// controllers/medicalServicesController.js

const { Op } = require('sequelize');
const MedicalService = require('../models/MedicalService.model');
const Clinic = require('../models/Clinic.model');
const handleSequelizeError = require('../middlewares/handleSequelizeError');

// Route pour récupérer tous les services médicaux
const getMedicalServices = async (req, res) => {
    try {
        const medicalServices = await MedicalService.findAll();
        res.json(medicalServices);
    } catch (error) {
        handleSequelizeError(res, error);
    }
};

// Route pour récupérer un service médical par ID
const getMedicalServiceById = async (req, res) => {
    const { id } = req.params;
    try {
        const medicalService = await MedicalService.findByPk(id);
        if (medicalService) {
            res.json(medicalService);
        } else {
            res.status(404).json({ message: 'Service médical non trouvé' });
        }
    } catch (error) {
        handleSequelizeError(res, error);
    }
};

// Route pour créer un nouveau service médical
const createMedicalService = async (req, res) => {
    const { name, description, price, clinicId } = req.body;
    try {
        const newMedicalService = await MedicalService.create({ name, description, price, clinicId });
        res.status(201).json(newMedicalService);
    } catch (error) {
        handleSequelizeError(res, error);
    }
};

// Route pour mettre à jour un service médical
const updateMedicalService = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, clinicId } = req.body;
    try {
        const medicalService = await MedicalService.findByPk(id);
        if (medicalService) {
            await medicalService.update({ name, description, price, clinicId });
            res.json(medicalService);
        } else {
            res.status(404).json({ message: 'Service médical non trouvé' });
        }
    } catch (error) {
        handleSequelizeError(res, error);
    }
};

// Route pour supprimer un service médical
const deleteMedicalService = async (req, res) => {
    const { id } = req.params;
    try {
        const medicalService = await MedicalService.findByPk(id);
        if (medicalService) {
            await medicalService.destroy();
            res.json({ message: 'Service médical supprimé' });
        } else {
            res.status(404).json({ message: 'Service médical non trouvé' });
        }
    } catch (error) {
        handleSequelizeError(res, error);
    }
};

// Exportation des méthodes du contrôleur des services médicaux
module.exports = {
    getMedicalServices,
    getMedicalServiceById,
    createMedicalService,
    updateMedicalService,
    deleteMedicalService,
};
