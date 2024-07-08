// controllers/examTypesController.js

const { Op } = require('sequelize');
const ExamType = require('../models/ExamType.model');
const handleSequelizeError = require('../middlewares/handleSequelizeError');

// Route pour récupérer tous les types d'examens
const getExamTypes = async (req, res) => {
    try {
        const examTypes = await ExamType.findAll();
        res.json(examTypes);
    } catch (error) {
        handleSequelizeError(res, error);
    }
};

// Route pour récupérer un type d'examen par ID
const getExamTypeById = async (req, res) => {
    const { id } = req.params;
    try {
        const examType = await ExamType.findByPk(id);
        if (examType) {
            res.json(examType);
        } else {
            res.status(404).json({ message: 'Type d\'examen non trouvé' });
        }
    } catch (error) {
        handleSequelizeError(res, error);
    }
};

// Route pour créer un nouveau type d'examen
const createExamType = async (req, res) => {
    const { name, description } = req.body;
    try {
        const newExamType = await ExamType.create({ name, description });
        res.status(201).json(newExamType);
    } catch (error) {
        handleSequelizeError(res, error);
    }
};

// Route pour mettre à jour un type d'examen
const updateExamType = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        const examType = await ExamType.findByPk(id);
        if (examType) {
            await examType.update({ name, description });
            res.json(examType);
        } else {
            res.status(404).json({ message: 'Type d\'examen non trouvé' });
        }
    } catch (error) {
        handleSequelizeError(res, error);
    }
};

// Route pour supprimer un type d'examen
const deleteExamType = async (req, res) => {
    const { id } = req.params;
    try {
        const examType = await ExamType.findByPk(id);
        if (examType) {
            await examType.destroy();
            res.json({ message: 'Type d\'examen supprimé' });
        } else {
            res.status(404).json({ message: 'Type d\'examen non trouvé' });
        }
    } catch (error) {
        handleSequelizeError(res, error);
    }
};

// Exportation des méthodes du contrôleur des types d'examens
module.exports = {
    getExamTypes,
    getExamTypeById,
    createExamType,
    updateExamType,
    deleteExamType,
};
