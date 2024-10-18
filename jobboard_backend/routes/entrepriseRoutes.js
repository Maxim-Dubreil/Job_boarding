// routes/entrepriseRoutes.js
const express = require('express');
const { createEntreprise, getEntrepriseById, updateEntreprise, deleteEntreprise, getAllEntreprises } = require('../controllers/entrepriseController');
const { authenticateToken, checkRole } = require('../middleware/authMiddleware');
const router = express.Router();

// Récupérer toutes les entreprises (ouvert au public)
router.get('/', getAllEntreprises);
router.get('/:id', getEntrepriseById); // Récupérer une entreprise par ID (ouvert au public)
router.post('/', createEntreprise);
// Routes protégées - recruteur et admin
// Remove `authenticateToken` middleware for new recruiter signup
router.put('/:id', authenticateToken, checkRole('recruteur'), updateEntreprise);
router.delete('/:id', authenticateToken, checkRole('admin'), deleteEntreprise); // Suppression réservée aux admins

module.exports = router;