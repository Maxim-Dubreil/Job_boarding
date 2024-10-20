// routes/entrepriseRoutes.js
const express = require('express');
const {
    createEntreprise,
    getEntrepriseById,
    updateEntreprise,
    deleteEntreprise,
    getAllEntreprises,
} = require('../controllers/entrepriseController');
const { authenticateToken, checkRole } = require('../middleware/authMiddleware');
const router = express.Router();

// Récupérer toutes les entreprises (ouvert au public)
router.get('/', getAllEntreprises);
router.get('/:id', getEntrepriseById); // Récupérer une entreprise par ID (ouvert au public)
router.post('/', createEntreprise);

// Routes protégées - recruteur et admin pour mise à jour
router.put('/:id', authenticateToken, updateEntreprise);

// Suppression réservée aux admins
router.delete('/:id', authenticateToken, checkRole('admin'), deleteEntreprise); 

module.exports = router;
