// routes/candidatureRoutes.js
const express = require('express');
const { createCandidature, getCandidaturesByUserId, getCandidaturesByOffreId, deleteCandidature } = require('../controllers/candidatureController');
const router = express.Router();

// Route pour créer une candidature
router.post('/', createCandidature);

// Route pour récupérer les candidatures d'un utilisateur
router.get('/user/:userId', getCandidaturesByUserId);

// Route pour récupérer les candidatures d'une offre
router.get('/offre/:offreId', getCandidaturesByOffreId);

// Route pour supprimer une candidature
router.delete('/:id', deleteCandidature);

module.exports = router;