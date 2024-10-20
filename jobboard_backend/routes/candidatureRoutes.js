// routes/candidatureRoutes.js
const express = require('express');
const { createCandidature, getCandidaturesByUserId, getCandidaturesByOffreId, deleteCandidature } = require('../controllers/candidatureController');
const { authenticateToken, checkRole } = require('../middleware/authMiddleware');
const router = express.Router();

// Route pour créer une candidature (employé uniquement)
router.post('/', createCandidature); // Remove `authenticateToken` if non-authenticated users can apply.


// Route pour récupérer les candidatures d'un utilisateur (employé uniquement)
router.get('/user/:userId', getCandidaturesByUserId);

// Route pour récupérer les candidatures d'une offre (recruteur uniquement)
router.get('/offre/:offreId', getCandidaturesByOffreId);

// Route pour supprimer une candidature (employé uniquement)
router.delete('/:id', deleteCandidature);

module.exports = router;