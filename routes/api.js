const express = require('express');
const router = express.Router();

// Importation des middlewares
const authMiddleware = require('../middlewares/authMiddleware');
const { verifyTokenAndRole, checkRole } = require('../middlewares/authMiddleware');

// Importation des contrôleurs
const authController = require('../controllers/authController');
const usersController = require('../controllers/usersController');
const clinicsController = require('../controllers/clinicsController');
const doctorsController = require('../controllers/doctorsController');
const clinicAdministratorsController = require('../controllers/clinicAdministratorsController');
const medicalInstitutionsController = require('../controllers/medicalInstitutionsController');
const medicalServicesController = require('../controllers/medicalServicesController');
const laboratoriesController = require('../controllers/laboratoriesController');
const examTypesController = require('../controllers/examTypesController');
const laboratoryExamsController = require('../controllers/laboratoryExamsController');
const appointmentsController = require('../controllers/appointmentsController');
const clinicDoctorsController = require('../controllers/clinicDoctorsController');

// Middleware global pour toutes les routes sauf celles d'authentification
router.use((req, res, next) => {
    console.log(`Requête reçue: ${req.method} ${req.path}`);
    if (req.path.startsWith('/auth')) {
        // Passer au prochain middleware ou route handler pour les routes d'authentification
        next();
    } else {
        // Appliquer le middleware authMiddleware pour toutes les autres routes
        authMiddleware(req, res, next);
    }
});

// // Route protégée accessible uniquement par un utilisateur avec le rôle "Admin1"
// router.get('/some-admin-protected-route', verifyTokenAndRole('Admin1'), someAdminProtectedRoute);
// // Route protégée accessible uniquement par un utilisateur avec le rôle "Doctor" (vérifie le rôle après le token)
// router.get('/some-role-protected-route', [verifyTokenAndRole('Doctor'), checkRole('Doctor')], someRoleProtectedRoute);

// Routes pour l'authentification
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.post('/auth/request-password-reset', authController.requestPasswordReset);
router.post('/auth/reset-password', authController.resetPassword);

// Routes pour les utilisateurs
router.get('/users', usersController.getUsers); // Obtenir tous les utilisateurs
router.get('/users/:id', usersController.getUserById); // Obtenir un utilisateur par ID
router.post('/users', usersController.createUser); // Créer un utilisateur
router.put('/users/:id', usersController.updateUser); // Mettre à jour un utilisateur
router.delete('/users/:id', usersController.deleteUser); // Supprimer un utilisateur

// Routes pour les cliniques
router.get('/clinics', clinicsController.getClinics); // Obtenir tous les cliniques
router.get('/clinics/:id', clinicsController.getClinicById); // Obtenir une clinique par ID
router.post('/clinics', clinicsController.createClinic); // Créer une clinique
router.put('/clinics/:id', clinicsController.updateClinic); // Mettre à jour une clinique
router.delete('/clinics/:id', clinicsController.deleteClinic); // Supprimer une clinique

// Routes pour les docteurs
router.get('/doctors', doctorsController.getDoctors); // Obtenir tous les docteurs
router.get('/doctors/:id', doctorsController.getDoctorById); // Obtenir un docteur par ID
router.post('/doctors', doctorsController.createDoctor); // Créer un nouveau docteur
router.put('/doctors/:id', doctorsController.updateDoctor); // Mettre à jour un docteur
router.delete('/doctors/:id', doctorsController.deleteDoctor); // Supprimer un docteur

// Routes pour les administrateurs clinique
router.get('/clinic-administrators', clinicAdministratorsController.getClinicAdministrators); // Obtenir tous les administrateurs clinique
router.get('/clinic-administrators/:id', clinicAdministratorsController.getClinicAdministratorById); // Obtenir un administrateur clinique par ID
router.post('/clinic-administrators', clinicAdministratorsController.createClinicAdministrator); // Créer un administrateur clinique
router.put('/clinic-administrators/:id', clinicAdministratorsController.updateClinicAdministrator); // Mettre à jour un administrateur clinique
router.delete('/clinic-administrators/:id', clinicAdministratorsController.deleteClinicAdministrator); // Supprimer un administrateur clinique

// Routes pour les institutions médicales
router.get('/medical-institutions', medicalInstitutionsController.getMedicalInstitutions); // Obtenir toutes les institutions médicales
router.get('/medical-institutions/:id', medicalInstitutionsController.getMedicalInstitutionById); // Obtenir une institution médicale par ID
router.post('/medical-institutions', medicalInstitutionsController.createMedicalInstitution); // Créer une institution médicale
router.put('/medical-institutions/:id', medicalInstitutionsController.updateMedicalInstitution); // Mettre à jour une institution médicale
router.delete('/medical-institutions/:id', medicalInstitutionsController.deleteMedicalInstitution); // Supprimer une institution médicale

// Routes pour les services médicaux
router.get('/medical-services', medicalServicesController.getMedicalServices); // Obtenir tous les services médicaux
router.get('/medical-services/:id', medicalServicesController.getMedicalServiceById); // Obtenir un service médical par ID
router.post('/medical-services', medicalServicesController.createMedicalService); // Créer un service médical
router.put('/medical-services/:id', medicalServicesController.updateMedicalService); // Mettre à jour un service médical
router.delete('/medical-services/:id', medicalServicesController.deleteMedicalService); // Supprimer un service médical

// Routes pour les laboratoires
router.get('/laboratories', laboratoriesController.getLaboratories); // Obtenir tous les laboratoires
router.get('/laboratories/:id', laboratoriesController.getLaboratoryById); // Obtenir un laboratoire par ID
router.post('/laboratories', laboratoriesController.createLaboratory); // Créer un laboratoire
router.put('/laboratories/:id', laboratoriesController.updateLaboratory); // Mettre à jour un laboratoire
router.delete('/laboratories/:id', laboratoriesController.deleteLaboratory); // Supprimer un laboratoire

// Routes pour les types d'examens
router.get('/exam-types', examTypesController.getExamTypes); // Obtenir tous les types d'examens
router.get('/exam-types/:id', examTypesController.getExamTypeById); // Obtenir un type d'examen par ID
router.post('/exam-types', examTypesController.createExamType); // Créer un type d'examen
router.put('/exam-types/:id', examTypesController.updateExamType); // Mettre à jour un type d'examen
router.delete('/exam-types/:id', examTypesController.deleteExamType); // Supprimer un type d'examen

// Routes pour les examens de laboratoire
router.get('/laboratory-exams', laboratoryExamsController.getLaboratoryExams); // Obtenir tous les examens de laboratoire
router.get('/laboratory-exams/:id', laboratoryExamsController.getLaboratoryExamById); // Obtenir un examen de laboratoire par ID
router.post('/laboratory-exams', laboratoryExamsController.createLaboratoryExam); // Créer un examen de laboratoire
router.put('/laboratory-exams/:id', laboratoryExamsController.updateLaboratoryExam); // Mettre à jour un examen de laboratoire
router.delete('/laboratory-exams/:id', laboratoryExamsController.deleteLaboratoryExam); // Supprimer un examen de laboratoire

// Routes pour les rendez-vous
router.get('/appointments', appointmentsController.getAppointments); // Obtenir tous les rendez-vous
router.get('/appointments/:id', appointmentsController.getAppointmentById); // Obtenir un rendez-vous par ID
router.post('/appointments', appointmentsController.createAppointment); // Créer un rendez-vous
router.put('/appointments/:id', appointmentsController.updateAppointment); // Mettre à jour un rendez-vous
router.delete('/appointments/:id', appointmentsController.deleteAppointment); // Supprimer un rendez-vous

// Routes pour les médecins de clinique
router.get('/clinic-doctors', clinicDoctorsController.getClinicDoctors); // Obtenir tous les médecins de clinique
router.get('/clinic-doctors/:id', clinicDoctorsController.getClinicDoctorById); // Obtenir un médecin de clinique par ID
router.post('/clinic-doctors', clinicDoctorsController.createClinicDoctor); // Créer un médecin de clinique
router.put('/clinic-doctors/:id', clinicDoctorsController.updateClinicDoctor); // Mettre à jour un médecin de clinique
router.delete('/clinic-doctors/:id', clinicDoctorsController.deleteClinicDoctor); // Supprimer un médecin de clinique

module.exports = router;
