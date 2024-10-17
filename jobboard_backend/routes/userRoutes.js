// routes/userRoutes.js
const express = require('express');
const { registerUser, loginUser, getUserProfile, updateUser, deleteUser } = require('../controllers/userController');
const { authenticateToken } = require('../middleware/authMiddleware');
const router = express.Router();

// Route pour l'inscription des utilisateurs (aucune authentification nécessaire)
router.post('/register', registerUser);

// Route pour la connexion des utilisateurs (aucune authentification nécessaire)
router.post('/login', loginUser);

// Route pour obtenir le profil utilisateur - Protégée par JWT
router.get('/profile/:id', authenticateToken, getUserProfile);

// Route pour mettre à jour les informations d'un utilisateur - Protégée par JWT
router.put('/:id', authenticateToken, updateUser);

// Route pour supprimer un utilisateur - Protégée par JWT
router.delete('/:id', authenticateToken, deleteUser);

module.exports = router;