const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');
const router = express.Router();

// Route pour l'inscription des utilisateurs
router.post('/register', registerUser);

// Route pour la connexion des utilisateurs
router.post('/login', loginUser);

// Route pour obtenir le profil utilisateur (JWT requis pour sécuriser l'accès)
router.get('/profile/:id', getUserProfile);

module.exports = router;