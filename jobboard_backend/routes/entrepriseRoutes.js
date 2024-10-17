// routes/entrepriseRoutes.js
const express = require('express');
const { createEntreprise, getEntrepriseById, updateEntreprise, deleteEntreprise, getAllEntreprises } = require('../controllers/entrepriseController');
const router = express.Router();

// Route pour créer une entreprise
router.post('/', createEntreprise);

// Route pour récupérer une entreprise par ID
router.get('/:id', getEntrepriseById);

// Route pour mettre à jour une entreprise
router.put('/:id', updateEntreprise);

// Route pour supprimer une entreprise
router.delete('/:id', deleteEntreprise);

// Récupérer toutes les entreprises
router.get('/', getAllEntreprises);

module.exports = router;