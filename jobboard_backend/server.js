// server.js

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const offreRoutes = require('./routes/offreRoutes');
const entrepriseRoutes = require('./routes/entrepriseRoutes');
const candidatureRoutes = require('./routes/candidatureRoutes');


// Initialisation du serveur
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Utilisation des routes
app.use('/api/users', userRoutes);
app.use('/api/offres', offreRoutes);
app.use('/api/entreprises', entrepriseRoutes);
app.use('/api/candidatures', candidatureRoutes);

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});