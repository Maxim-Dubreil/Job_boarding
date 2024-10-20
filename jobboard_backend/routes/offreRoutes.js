// routes/offreRoutes.js
const express = require('express');
const {
    createOffer,
    getAllOffers,
    getOffer,
    updateOffer,
    deleteOffer,
    getAllEntrepriseOffers
} = require('../controllers/offreController');
const { authenticateToken, checkRole } = require('../middleware/authMiddleware');
const router = express.Router();

// Routes ouvertes au public
router.get('/', getAllOffers); // Get all job offers
router.get('/:id', getOffer); // Get a specific job offer by ID

// Routes protégées - recruteur uniquement (Protected routes for recruiters only)
router.post('/', createOffer); // Create a new job offer
router.put('/:id', updateOffer); // Update an existing job offer
router.delete('/:id', deleteOffer); // Delete a job offer

// Route pour obtenir toutes les offres d'emploi d'une entreprise (Get all job offers of a specific company)
router.get('/entreprise/:id_entreprise', getAllEntrepriseOffers);

module.exports = router;