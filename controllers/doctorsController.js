// controllers/doctorsController.js

const Doctor = require('../models/Doctor.model');
const handleSequelizeError = require('../middlewares/handleSequelizeError');
const Clinic = require('../models/Clinic.model');
const User = require('../models/User.model');

// Route pour récupérer tous les docteurs
const getDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.findAll();
        res.json(doctors);
    } catch (error) {
        handleSequelizeError(res, error);
    }
};

// Route pour récupérer un docteur par ID
const getDoctorById = async (req, res) => {
    const { id } = req.params;
    try {
        const doctor = await Doctor.findByPk(id);
        if (doctor) {
            res.json(doctor);
        } else {
            res.status(404).json({ message: 'Docteur non trouvé' });
        }
    } catch (error) {
        handleSequelizeError(res, error);
    }
};

// Route pour créer un nouveau docteur
const createDoctor = async (req, res) => {
    const { speciality, rank, clinicId, userId } = req.body;
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

        const newDoctor = await Doctor.create({ speciality, rank, clinicId, userId });
        res.status(201).json(newDoctor);
    } catch (error) {
        handleSequelizeError(res, error);
    }
};

// Route pour mettre à jour un docteur
const updateDoctor = async (req, res) => {
    const { id } = req.params;
    const { speciality, rank, clinicId, userId } = req.body;
    try {
        const doctor = await Doctor.findByPk(id);
        if (doctor) {
            // Vérifier si la clinique et l'utilisateur existent
            const clinic = await Clinic.findByPk(clinicId);
            const user = await User.findByPk(userId);

            if (!clinic) {
                return res.status(404).json({ message: 'Clinique non trouvée' });
            }

            if (!user) {
                return res.status(404).json({ message: 'Utilisateur non trouvé' });
            }

            await doctor.update({ speciality, rank, clinicId, userId });
            res.json(doctor);
        } else {
            res.status(404).json({ message: 'Docteur non trouvé' });
        }
    } catch (error) {
        handleSequelizeError(res, error);
    }
};

// Route pour supprimer un docteur
const deleteDoctor = async (req, res) => {
    const { id } = req.params;
    try {
        const doctor = await Doctor.findByPk(id);
        if (doctor) {
            await doctor.destroy();
            res.json({ message: 'Docteur supprimé' });
        } else {
            res.status(404).json({ message: 'Docteur non trouvé' });
        }
    } catch (error) {
        handleSequelizeError(res, error);
    }
};

// Exportation des méthodes du contrôleur des docteurs
module.exports = {
    getDoctors,
    getDoctorById,
    createDoctor,
    updateDoctor,
    deleteDoctor,
};
