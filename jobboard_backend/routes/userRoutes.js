// routes/userRoutes.js
const express = require('express');
const { registerUser, loginUser, getUserProfile, updateUser, deleteUser, getAllUsers } = require('../controllers/userController');
const { authenticateToken, checkRole } = require('../middleware/authMiddleware');
const router = express.Router();

// Routes publiques
router.post('/register', registerUser);
router.post('/login', loginUser);

// Routes protégées
router.get('/profile/:id', authenticateToken, getUserProfile);
router.put('/:id', authenticateToken, updateUser);

// Suppression réservée aux admins
router.delete('/:id', authenticateToken, checkRole('admin'), deleteUser);

// Récupérer tous les utilisateurs (admin uniquement)
router.get('/', authenticateToken, checkRole('admin'), getAllUsers);

module.exports = router;
