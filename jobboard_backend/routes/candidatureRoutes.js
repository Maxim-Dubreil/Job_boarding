// routes/candidatureRoutes.js
const express = require('express');
const { createCandidature, getCandidaturesByUserId, getCandidaturesByOffreId, deleteCandidature } = require('../controllers/candidatureController');
const { authenticateToken, checkRole } = require('../middleware/authMiddleware');
const router = express.Router();

// Route pour créer une candidature (employé uniquement)
router.post('/', authenticateToken, checkRole('employé'), createCandidature);

// Route pour récupérer les candidatures d'un utilisateur (employé uniquement)
router.get('/user/:userId', authenticateToken, checkRole('employé'), getCandidaturesByUserId);

// Route pour récupérer les candidatures d'une offre (recruteur uniquement)
router.get('/offre/:offreId', authenticateToken, checkRole('recruteur'), getCandidaturesByOffreId);

// Route pour supprimer une candidature (employé uniquement)
router.delete('/:id', authenticateToken, checkRole('employé'), deleteCandidature);

module.exports = router;