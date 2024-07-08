const ClinicAdministrator = require('../models/ClinicAdministrator.model');
const Clinic = require('../models/Clinic.model');
const User = require('../models/User.model');
const handleSequelizeError = require('../middlewares/handleSequelizeError');

// Route pour récupérer tous les administrateurs de cliniques
const getClinicAdministrators = async (req, res) => {
    try {
        const administrators = await ClinicAdministrator.findAll();
        res.json(administrators);
    } catch (error) {
        handleSequelizeError(res, error);
    }
};

// Route pour récupérer un administrateur de clinique par ID
const getClinicAdministratorById = async (req, res) => {
    const { id } = req.params;
    try {
        const administrator = await ClinicAdministrator.findByPk(id);
        if (administrator) {
            res.json(administrator);
        } else {
            res.status(404).json({ message: 'Administrateur de clinique non trouvé' });
        }
    } catch (error) {
        handleSequelizeError(res, error);
    }
};

// Route pour créer un nouvel administrateur de clinique
const createClinicAdministrator = async (req, res) => {
    const { clinicId, userId } = req.body;
    try {
        // Vérifier si la clinique et l'utilisateur existent
        const clinic = await Clinic.findByPk(clinicId);
        const user = await User.findByPk(userId);

        if (!clinic) {
            return res.status(404).json({ message: 'Clinique non trouvée' });
        }

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        const newAdministrator = await ClinicAdministrator.create({ clinicId, userId });
        res.status(201).json(newAdministrator);
    } catch (error) {
        handleSequelizeError(res, error);
    }
};

// Route pour mettre à jour un administrateur de clinique
const updateClinicAdministrator = async (req, res) => {
    const { id } = req.params;
    const { clinicId, userId } = req.body;
    try {
        const administrator = await ClinicAdministrator.findByPk(id);
        if (administrator) {
            // Vérifier si la clinique et l'utilisateur existent
            const clinic = await Clinic.findByPk(clinicId);
            const user = await User.findByPk(userId);

            if (!clinic) {
                return res.status(404).json({ message: 'Clinique non trouvée' });
            }

            if (!user) {
                return res.status(404).json({ message: 'Utilisateur non trouvé' });
            }

            await administrator.update({ clinicId, userId });
            res.json(administrator);
        } else {
            res.status(404).json({ message: 'Administrateur de clinique non trouvé' });
        }
    } catch (error) {
        handleSequelizeError(res, error);
    }
};

// Route pour supprimer un administrateur de clinique
const deleteClinicAdministrator = async (req, res) => {
    const { id } = req.params;
    try {
        const administrator = await ClinicAdministrator.findByPk(id);
        if (administrator) {
            await administrator.destroy();
            res.json({ message: 'Administrateur de clinique supprimé' });
        } else {
            res.status(404).json({ message: 'Administrateur de clinique non trouvé' });
        }
    } catch (error) {
        handleSequelizeError(res, error);
    }
};

// Exportation des méthodes du contrôleur des administrateurs de cliniques
module.exports = {
    getClinicAdministrators,
    getClinicAdministratorById,
    createClinicAdministrator,
    updateClinicAdministrator,
    deleteClinicAdministrator,
};
