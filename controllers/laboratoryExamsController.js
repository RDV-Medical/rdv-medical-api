// controllers/laboratoryExamsController.js

const { Op } = require('sequelize');
const LaboratoryExam = require('../models/LaboratoryExam.model');
const handleSequelizeError = require('../middlewares/handleSequelizeError');

// Route pour récupérer tous les examens de laboratoire
const getLaboratoryExams = async (req, res) => {
    try {
        const laboratoryExams = await LaboratoryExam.findAll();
        res.json(laboratoryExams);
    } catch (error) {
        handleSequelizeError(res, error);
    }
};

// Route pour récupérer un examen de laboratoire par ID
const getLaboratoryExamById = async (req, res) => {
    const { id } = req.params;
    try {
        const laboratoryExam = await LaboratoryExam.findByPk(id);
        if (laboratoryExam) {
            res.json(laboratoryExam);
        } else {
            res.status(404).json({ message: 'Examen de laboratoire non trouvé' });
        }
    } catch (error) {
        handleSequelizeError(res, error);
    }
};

// Route pour créer un nouvel examen de laboratoire
const createLaboratoryExam = async (req, res) => {
    const { laboratory_id, exam_type_id, price } = req.body;
    try {
        const newLaboratoryExam = await LaboratoryExam.create({ laboratory_id, exam_type_id, price });
        res.status(201).json(newLaboratoryExam);
    } catch (error) {
        handleSequelizeError(res, error);
    }
};

// Route pour mettre à jour un examen de laboratoire
const updateLaboratoryExam = async (req, res) => {
    const { id } = req.params;
    const { laboratory_id, exam_type_id, price } = req.body;
    try {
        const laboratoryExam = await LaboratoryExam.findByPk(id);
        if (laboratoryExam) {
            await laboratoryExam.update({ laboratory_id, exam_type_id, price });
            res.json(laboratoryExam);
        } else {
            res.status(404).json({ message: 'Examen de laboratoire non trouvé' });
        }
    } catch (error) {
        handleSequelizeError(res, error);
    }
};

// Route pour supprimer un examen de laboratoire
const deleteLaboratoryExam = async (req, res) => {
    const { id } = req.params;
    try {
        const laboratoryExam = await LaboratoryExam.findByPk(id);
        if (laboratoryExam) {
            await laboratoryExam.destroy();
            res.json({ message: 'Examen de laboratoire supprimé' });
        } else {
            res.status(404).json({ message: 'Examen de laboratoire non trouvé' });
        }
    } catch (error) {
        handleSequelizeError(res, error);
    }
};

// Exportation des méthodes du contrôleur des examens de laboratoire
module.exports = {
    getLaboratoryExams,
    getLaboratoryExamById,
    createLaboratoryExam,
    updateLaboratoryExam,
    deleteLaboratoryExam,
};
