// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const offreRoutes = require('./routes/offreRoutes'); // Importer les routes des offres d'emploi

// Initialisation du serveur
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Utilisation des routes
app.use('/api/users', userRoutes);
app.use('/api/offres', offreRoutes); // Ajouter les routes pour les offres d'emploi

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});