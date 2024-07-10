const ClinicDoctor = require('../models/ClinicDoctor.model');
const Clinic = require('../models/Clinic.model');
const User = require('../models/User.model');
const Doctor = require('../models/Doctor.model'); // Assuming you have a Doctor model
const handleSequelizeError = require('../middlewares/handleSequelizeError');

// Route pour récupérer tous les médecins de cliniques
const getClinicDoctors = async (req, res) => {
    try {
        const doctors = await ClinicDoctor.findAll();
        res.json(doctors);
    } catch (error) {
        handleSequelizeError(res, error);
    }
};

// Route pour récupérer un médecin de clinique par ID
const getClinicDoctorById = async (req, res) => {
    const { id } = req.params;
    try {
        const doctor = await ClinicDoctor.findByPk(id);
        if (doctor) {
            res.json(doctor);
        } else {
            res.status(404).json({ message: 'Médecin de clinique non trouvé' });
        }
    } catch (error) {
        handleSequelizeError(res, error);
    }
};

// Route pour créer un nouveau médecin de clinique
const createClinicDoctor = async (req, res) => {
    const { doctorId, clinicId, userId } = req.body;
    try {
        // Vérifier si le médecin, la clinique et l'utilisateur existent
        const doctor = await Doctor.findByPk(doctorId);
        const clinic = await Clinic.findByPk(clinicId);
        const user = await User.findByPk(userId);

        if (!doctor) {
            return res.status(404).json({ message: 'Médecin non trouvé' });
        }

        if (!clinic) {
            return res.status(404).json({ message: 'Clinique non trouvée' });
        }

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        const newDoctor = await ClinicDoctor.create({ doctorId, clinicId, userId });
        res.status(201).json(newDoctor);
    } catch (error) {
        handleSequelizeError(res, error);
    }
};

// Route pour mettre à jour un médecin de clinique
const updateClinicDoctor = async (req, res) => {
    const { id } = req.params;
    const { doctorId, clinicId, userId } = req.body;
    try {
        const doctor = await ClinicDoctor.findByPk(id);
        if (doctor) {
            // Vérifier si le médecin, la clinique et l'utilisateur existent
            const doctorExists = await Doctor.findByPk(doctorId);
            const clinic = await Clinic.findByPk(clinicId);
            const user = await User.findByPk(userId);

            if (!doctorExists) {
                return res.status(404).json({ message: 'Médecin non trouvé' });
            }

            if (!clinic) {
                return res.status(404).json({ message: 'Clinique non trouvée' });
            }

            if (!user) {
                return res.status(404).json({ message: 'Utilisateur non trouvé' });
            }

            await doctor.update({ doctorId, clinicId, userId });
            res.json(doctor);
        } else {
            res.status(404).json({ message: 'Médecin de clinique non trouvé' });
        }
    } catch (error) {
        handleSequelizeError(res, error);
    }
};

// Route pour supprimer un médecin de clinique
const deleteClinicDoctor = async (req, res) => {
    const { id } = req.params;
    try {
        const doctor = await ClinicDoctor.findByPk(id);
        if (doctor) {
            await doctor.destroy();
            res.json({ message: 'Médecin de clinique supprimé' });
        } else {
            res.status(404).json({ message: 'Médecin de clinique non trouvé' });
        }
    } catch (error) {
        handleSequelizeError(res, error);
    }
};

// Exportation des méthodes du contrôleur des médecins de cliniques
module.exports = {
    getClinicDoctors,
    getClinicDoctorById,
    createClinicDoctor,
    updateClinicDoctor,
    deleteClinicDoctor,
};
