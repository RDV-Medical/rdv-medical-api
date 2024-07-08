require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { Op } = require('sequelize');
const User = require('../models/User.model');
const handleSequelizeError = require('../middlewares/handleSequelizeError'); // Middleware pour gérer les erreurs de Sequelize
const transporter = require('../services/emailService');

const secretKey = process.env.JWT_SECRET;

// Fonction pour enregistrer un nouvel utilisateur
const register = async (req, res) => {
    const { firstName, lastName, username, email, phoneNumber, address, role, password } = req.body;

    try {
        // Vérifier si l'utilisateur existe déjà avec le même username, email ou phoneNumber
        const existingUser = await User.findOne({
            where: {
                [Op.or]: [
                    { username },
                    { email },
                    { phoneNumber }
                ]
            }
        });

        if (existingUser) {
            return res.status(400).json({ error: 'Username, email, or phone number already exists' });
        }

        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Créer un nouvel utilisateur
        const newUser = await User.create({
            firstName,
            lastName,
            username,
            email,
            phoneNumber,
            address,
            role,
            password: hashedPassword
        });

        res.status(201).json(newUser);
    } catch (error) {
        handleSequelizeError(res, error);
    }
};

// Fonction pour connecter un utilisateur
const login = async (req, res) => {
    const { identifier, password } = req.body;

    try {
        const user = await User.findOne({
            where: {
                [Op.or]: [
                    { username: identifier },
                    { email: identifier },
                    { phoneNumber: identifier }
                ]
            }
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, secretKey, { expiresIn: '100h' });

        res.json({ token });
    } catch (error) {
        handleSequelizeError(res, error);
    }
};

// Fonction pour demander la réinitialisation du mot de passe
const requestPasswordReset = async (req, res) => {
    const { identifier } = req.body;

    try {
        const user = await User.findOne({
            where: {
                [Op.or]: [
                    { username: identifier },
                    { email: identifier },
                    { phoneNumber: identifier }
                ]
            }
        });

        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }

        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetExpires = Date.now() + 3600000; // 1 heure en millisecondes

        await user.update({
            resetPasswordToken: resetToken,
            resetPasswordExpires: resetExpires
        });

        const resetURL = `http://localhost:3000/reset-password?token=${resetToken}`;

        const mailOptions = {
            to: user.email,
            from: process.env.EMAIL_USER,
            subject: 'Réinitialisation de mot de passe',
            text: `Vous recevez cet e-mail parce que vous (ou quelqu'un d'autre) avez demandé la réinitialisation du mot de passe de votre compte.\n\n` +
                `Cliquez sur le lien suivant ou copiez-collez-le dans votre navigateur pour compléter le processus dans l'heure suivante:\n\n` +
                `${resetURL}\n\n` +
                `Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet e-mail et votre mot de passe restera inchangé.\n`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: `Un e-mail de réinitialisation de mot de passe a été envoyé à ${user.email}` });
    } catch (error) {
        handleSequelizeError(res, error);
    }
};

// Fonction pour réinitialiser le mot de passe
const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        const user = await User.findOne({
            where: {
                resetPasswordToken: token,
                resetPasswordExpires: {
                    [Op.gt]: Date.now()
                }
            }
        });

        if (!user) {
            return res.status(400).json({ error: 'Le token de réinitialisation est invalide ou a expiré' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await user.update({
            password: hashedPassword,
            resetPasswordToken: null,
            resetPasswordExpires: null
        });

        res.status(200).json({ message: 'Le mot de passe a été réinitialisé avec succès' });
    } catch (error) {
        handleSequelizeError(res, error);
    }
};

module.exports = {
    register,
    login,
    requestPasswordReset,
    resetPassword
};
