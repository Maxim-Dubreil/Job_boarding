// routes/entrepriseRoutes.js
const express = require('express');
const { createEntreprise, getEntrepriseById, updateEntreprise, deleteEntreprise, getAllEntreprises } = require('../controllers/entrepriseController');
const { authenticateToken, checkRole } = require('../middleware/authMiddleware');
const router = express.Router();

// Récupérer toutes les entreprises (ouvert au public)
router.get('/', getAllEntreprises);
router.get('/:id', getEntrepriseById); // Récupérer une entreprise par ID (ouvert au public)

// Routes protégées - recruteur et admin
router.post('/', authenticateToken, checkRole('recruteur'), createEntreprise);
router.put('/:id', authenticateToken, checkRole('recruteur'), updateEntreprise);
router.delete('/:id', authenticateToken, checkRole('admin'), deleteEntreprise); // Suppression réservée aux admins

module.exports = router;