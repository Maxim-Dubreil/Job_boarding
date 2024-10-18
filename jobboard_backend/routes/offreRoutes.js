// routes/offreRoutes.js
const express = require('express');
const { createOffer, getAllOffers, getOffer, updateOffer, deleteOffer, getAllEntrepriseOffers } = require('../controllers/offreController');
const { createOffer, getAllOffers, getOffer, updateOffer, deleteOffer } = require('../controllers/offreController');
const { authenticateToken, checkRole } = require('../middleware/authMiddleware');
const router = express.Router();

// Routes ouvertes au public
router.get('/', getAllOffers);
router.get('/:id', getOffer);

// Routes protégées - recruteur uniquement
router.post('/', authenticateToken, checkRole('recruteur'), createOffer);
router.put('/:id', authenticateToken, checkRole('recruteur'), updateOffer);
router.delete('/:id', authenticateToken, checkRole('recruteur'), deleteOffer);

module.exports = router;