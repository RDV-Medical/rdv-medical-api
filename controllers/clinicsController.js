// controllers/clinicsController.js

const Clinic = require('../models/Clinic.model');
const handleSequelizeError = require('../middlewares/handleSequelizeError');

// Route pour récupérer toutes les cliniques
const getClinics = async (req, res) => {
    try {
        const clinics = await Clinic.findAll();
        res.json(clinics);
    } catch (error) {
        handleSequelizeError(res, error);
    }
};

// Route pour récupérer une clinique par ID
const getClinicById = async (req, res) => {
    const { id } = req.params;
    try {
        const clinic = await Clinic.findByPk(id);
        if (clinic) {
            res.json(clinic);
        } else {
            res.status(404).json({ message: 'Clinique non trouvée' });
        }
    } catch (error) {
        handleSequelizeError(res, error);
    }
};

// Route pour créer une nouvelle clinique
const createClinic = async (req, res) => {
    const { name, address, location } = req.body;
    try {
        const newClinic = await Clinic.create({ 
            name, 
            address, 
            location: location ? { type: 'Point', coordinates: location.coordinates } : null 
        });
        res.status(201).json(newClinic);
    } catch (error) {
        handleSequelizeError(res, error);
    }
};

// Route pour mettre à jour une clinique
const updateClinic = async (req, res) => {
    const { id } = req.params;
    const { name, address, location } = req.body;
    try {
        const clinic = await Clinic.findByPk(id);
        if (clinic) {
            await clinic.update({ 
                name, 
                address, 
                location: location ? { type: 'Point', coordinates: location.coordinates } : clinic.location 
            });
            res.json(clinic);
        } else {
            res.status(404).json({ message: 'Clinique non trouvée' });
        }
    } catch (error) {
        handleSequelizeError(res, error);
    }
};

// Route pour supprimer une clinique
const deleteClinic = async (req, res) => {
    const { id } = req.params;
    try {
        const clinic = await Clinic.findByPk(id);
        if (clinic) {
            await clinic.destroy();
            res.json({ message: 'Clinique supprimée' });
        } else {
            res.status(404).json({ message: 'Clinique non trouvée' });
        }
    } catch (error) {
        handleSequelizeError(res, error);
    }
};

// Exportation des méthodes du contrôleur des cliniques
module.exports = {
    getClinics,
    getClinicById,
    createClinic,
    updateClinic,
    deleteClinic,
};
