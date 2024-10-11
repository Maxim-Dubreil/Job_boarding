// routes/userRoutes.js
const express = require('express');
const { registerUser, loginUser, getUserProfile, updateUser, deleteUser } = require('../controllers/userController');
const router = express.Router();

// Route pour l'inscription des utilisateurs
router.post('/register', registerUser);

// Route pour la connexion des utilisateurs
router.post('/login', loginUser);

// Route pour obtenir le profil utilisateur
router.get('/profile/:id', getUserProfile);

// Route pour mettre à jour les informations d'un utilisateur
router.put('/:id', updateUser); // Cette route devrait être définie ici

// Route pour supprimer un utilisateur
router.delete('/:id', deleteUser);

module.exports = router;