// controllers/candidatureController.js (Sequelize Version)
const { Candidature, Utilisateur } = require('../models');
// Créer une nouvelle candidature
const createCandidature = async (req, res) => {
    const { id_offre, id_utilisateur, nom, email, telephone, message_candidature } = req.body;

    // Log request data to verify if correct data is being sent
    console.log('Received data:', req.body);

    try {
        const candidature = await Candidature.create({
            id_offre,
            id_utilisateur: id_utilisateur || null,
            nom: nom || null,
            email: email || null,
            telephone: telephone || null,
            message_candidature,
        });
        res.json({ message: 'Candidature créée avec succès', id: candidature.id });
    } catch (err) {
        console.error('Erreur lors de la création de la candidature :', err);
        res.status(500).json({ error: 'Erreur lors de la création de la candidature' });
    }
};




// Récupérer toutes les candidatures d'un utilisateur
const getCandidaturesByUserId = async (req, res) => {
    const { userId } = req.params;

    try {
        const candidatures = await Candidature.findAll({ where: { id_utilisateur: userId } });
        res.json(candidatures);
    } catch (err) {
        console.error('Erreur lors de la récupération des candidatures :', err);
        res.status(500).json({ error: 'Erreur lors de la récupération des candidatures' });
    }
};

// Récupérer toutes les candidatures d'une offre d'emploi

const getCandidaturesByOffreId = async (req, res) => {
    const offreId = req.params.offreId; 
  
    if (!offreId) {
      return res.status(400).json({ error: 'Missing offre ID parameter' });
    }
  
    try {
      const candidatures = await Candidature.findAll({
        where: { id_offre: offreId },
        include: [
          {
            model: Utilisateur,
            as: 'utilisateur',
            attributes: ['nom', 'prenom', 'email', 'telephone']
          }
        ]
      });
      res.status(200).json(candidatures);
    } catch (error) {
      console.error('Erreur lors de la récupération des candidatures :', error);
      res.status(500).json({ error: 'Erreur lors de la récupération des candidatures.' });
    }
  };
  
// Supprimer une candidature par ID
const deleteCandidature = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Candidature.destroy({ where: { id } });
        if (result === 0) {
            return res.status(404).json({ error: 'Candidature non trouvée' });
        }
        res.json({ message: 'Candidature supprimée avec succès' });
    } catch (err) {
        console.error('Erreur lors de la suppression de la candidature :', err);
        res.status(500).json({ error: 'Erreur lors de la suppression de la candidature' });
    }
};

module.exports = {
    createCandidature,
    getCandidaturesByUserId,
    getCandidaturesByOffreId,
    deleteCandidature,
};
