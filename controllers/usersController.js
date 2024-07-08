// controllers/usersController.js

const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const User = require('../models/User.model');
const handleSequelizeError = require('../middlewares/handleSequelizeError');

// Route pour récupérer tous les utilisateurs
const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        handleSequelizeError(res, error);
    }
};

// Route pour récupérer un utilisateur par ID
const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
    } catch (error) {
        handleSequelizeError(res, error);
    }
};

// Route pour créer un nouvel utilisateur
const createUser = async (req, res) => {
    const { firstName, lastName, username, email, phoneNumber, address, role, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ firstName, lastName, username, email, phoneNumber, address, role, password: hashedPassword });
        res.status(201).json(newUser);
    } catch (error) {
        handleSequelizeError(res, error);
    }
};

// Route pour mettre à jour un utilisateur
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, username, email, phoneNumber, address, role, password } = req.body;
    try {
        const user = await User.findByPk(id);
        if (user) {
            const updatedData = { firstName, lastName, username, email, phoneNumber, address, role };
            if (password) {
                updatedData.password = await bcrypt.hash(password, 10);
            }
            await user.update(updatedData);
            res.json(user);
        } else {
            res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
    } catch (error) {
        handleSequelizeError(res, error);
    }
};

// Route pour supprimer un utilisateur
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (user) {
            await user.destroy();
            res.json({ message: 'Utilisateur supprimé' });
        } else {
            res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
    } catch (error) {
        handleSequelizeError(res, error);
    }
};

// Exportation des méthodes du contrôleur des utilisateurs
module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
