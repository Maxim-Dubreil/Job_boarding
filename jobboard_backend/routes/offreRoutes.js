// routes/offreRoutes.js
const express = require('express');
const { createOffer, getAllOffers, getOffer, updateOffer, deleteOffer } = require('../controllers/offreController');
const router = express.Router();

// Route pour créer une nouvelle offre d'emploi
router.post('/', createOffer);

// Route pour obtenir toutes les offres d'emploi
router.get('/', getAllOffers);

// Route pour obtenir une offre spécifique
router.get('/:id', getOffer);

// Route pour mettre à jour une offre d'emploi
router.put('/:id', updateOffer);

// Route pour supprimer une offre d'emploi
router.delete('/:id', deleteOffer);

module.exports = router;