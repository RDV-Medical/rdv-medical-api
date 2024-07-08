// controllers/medicalInstitutionsController.js

const MedicalInstitution = require('../models/MedicalInstitution.model');
const handleSequelizeError = require('../middlewares/handleSequelizeError');

// Route pour récupérer toutes les institutions médicales
const getMedicalInstitutions = async (req, res) => {
    try {
        const medicalInstitutions = await MedicalInstitution.findAll();
        res.json(medicalInstitutions);
    } catch (error) {
        handleSequelizeError(res, error);
    }
};

// Route pour récupérer une institution médicale par ID
const getMedicalInstitutionById = async (req, res) => {
    const { id } = req.params;
    try {
        const medicalInstitution = await MedicalInstitution.findByPk(id);
        if (medicalInstitution) {
            res.json(medicalInstitution);
        } else {
            res.status(404).json({ message: 'Institution médicale non trouvée' });
        }
    } catch (error) {
        handleSequelizeError(res, error);
    }
};

// Route pour créer une nouvelle institution médicale
const createMedicalInstitution = async (req, res) => {
    const { name, address, location } = req.body;
    try {
        const newMedicalInstitution = await MedicalInstitution.create({ name, address, location });
        res.status(201).json(newMedicalInstitution);
    } catch (error) {
        handleSequelizeError(res, error);
    }
};

// Route pour mettre à jour une institution médicale
const updateMedicalInstitution = async (req, res) => {
    const { id } = req.params;
    const { name, address, location } = req.body;
    try {
        const medicalInstitution = await MedicalInstitution.findByPk(id);
        if (medicalInstitution) {
            await medicalInstitution.update({ name, address, location });
            res.json(medicalInstitution);
        } else {
            res.status(404).json({ message: 'Institution médicale non trouvée' });
        }
    } catch (error) {
        handleSequelizeError(res, error);
    }
};

// Route pour supprimer une institution médicale
const deleteMedicalInstitution = async (req, res) => {
    const { id } = req.params;
    try {
        const medicalInstitution = await MedicalInstitution.findByPk(id);
        if (medicalInstitution) {
            await medicalInstitution.destroy();
            res.json({ message: 'Institution médicale supprimée' });
        } else {
            res.status(404).json({ message: 'Institution médicale non trouvée' });
        }
    } catch (error) {
        handleSequelizeError(res, error);
    }
};

// Exportation des méthodes du contrôleur des institutions médicales
module.exports = {
    getMedicalInstitutions,
    getMedicalInstitutionById,
    createMedicalInstitution,
    updateMedicalInstitution,
    deleteMedicalInstitution,
};
