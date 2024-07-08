// controllers/laboratoriesController.js

const { Op } = require('sequelize');
const Laboratory = require('../models/Laboratory.model');
const handleSequelizeError = require('../middlewares/handleSequelizeError');

// Route pour récupérer tous les laboratoires
const getLaboratories = async (req, res) => {
    try {
        const laboratories = await Laboratory.findAll();
        res.json(laboratories);
    } catch (error) {
        handleSequelizeError(res, error);
    }
};

// Route pour récupérer un laboratoire par ID
const getLaboratoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const laboratory = await Laboratory.findByPk(id);
        if (laboratory) {
            res.json(laboratory);
        } else {
            res.status(404).json({ message: 'Laboratoire non trouvé' });
        }
    } catch (error) {
        handleSequelizeError(res, error);
    }
};

// Route pour créer un nouveau laboratoire
const createLaboratory = async (req, res) => {
    const { name, address, location, responsibleName, isApproved } = req.body;
    try {
        const newLaboratory = await Laboratory.create({ name, address, location, responsibleName, isApproved });
        res.status(201).json(newLaboratory);
    } catch (error) {
        handleSequelizeError(res, error);
    }
};

// Route pour mettre à jour un laboratoire
const updateLaboratory = async (req, res) => {
    const { id } = req.params;
    const { name, address, location, responsibleName, isApproved } = req.body;
    try {
        const laboratory = await Laboratory.findByPk(id);
        if (laboratory) {
            await laboratory.update({ name, address, location, responsibleName, isApproved });
            res.json(laboratory);
        } else {
            res.status(404).json({ message: 'Laboratoire non trouvé' });
        }
    } catch (error) {
        handleSequelizeError(res, error);
    }
};

// Route pour supprimer un laboratoire
const deleteLaboratory = async (req, res) => {
    const { id } = req.params;
    try {
        const laboratory = await Laboratory.findByPk(id);
        if (laboratory) {
            await laboratory.destroy();
            res.json({ message: 'Laboratoire supprimé' });
        } else {
            res.status(404).json({ message: 'Laboratoire non trouvé' });
        }
    } catch (error) {
        handleSequelizeError(res, error);
    }
};

// Exportation des méthodes du contrôleur des laboratoires
module.exports = {
    getLaboratories,
    getLaboratoryById,
    createLaboratory,
    updateLaboratory,
    deleteLaboratory,
};
