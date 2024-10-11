// routes/userRoutes.js
const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');
const router = express.Router();

// Vérifiez que les fonctions importées sont correctes
console.log(registerUser, loginUser, getUserProfile); // Ajoutez ceci pour vérifier si les fonctions sont `undefined`

// Route pour l'inscription des utilisateurs
router.post('/register', registerUser); // Si `registerUser` est `undefined`, cela provoquera l'erreur

// Route pour la connexion des utilisateurs
router.post('/login', loginUser);

// Route pour obtenir le profil utilisateur
router.get('/profile/:id', getUserProfile);

module.exports = router;