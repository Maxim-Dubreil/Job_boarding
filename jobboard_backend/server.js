// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes'); // Assurez-vous que ce chemin est correct

// Initialisation du serveur
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Utilisation des routes
app.use('/api/users', userRoutes); // Assurez-vous que cette ligne est présente

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});