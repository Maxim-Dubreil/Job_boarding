// controllers/candidatureController.js
const db = require('../db');

// Créer une nouvelle candidature
const createCandidature = (req, res) => {
    const { id_offre, id_utilisateur, message_candidature } = req.body;

    const sql = `
        INSERT INTO candidatures (id_offre, id_utilisateur, message_candidature)
        VALUES (?, ?, ?)
    `;
    db.query(sql, [id_offre, id_utilisateur, message_candidature], (err, result) => {
        if (err) {
            console.error('Erreur lors de la création de la candidature :', err);
            return res.status(500).json({ error: 'Erreur lors de la création de la candidature' });
        }
        res.json({ message: 'Candidature créée avec succès', id: result.insertId });
    });
};

// Récupérer toutes les candidatures d'un utilisateur
const getCandidaturesByUserId = (req, res) => {
    const { userId } = req.params;

    const sql = 'SELECT * FROM candidatures WHERE id_utilisateur = ?';
    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des candidatures :', err);
            return res.status(500).json({ error: 'Erreur lors de la récupération des candidatures' });
        }
        res.json(results);
    });
};

// Récupérer toutes les candidatures d'une offre d'emploi
const getCandidaturesByOffreId = (req, res) => {
    const { offreId } = req.params;

    const sql = 'SELECT * FROM candidatures WHERE id_offre = ?';
    db.query(sql, [offreId], (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des candidatures :', err);
            return res.status(500).json({ error: 'Erreur lors de la récupération des candidatures' });
        }
        res.json(results);
    });
};

// Supprimer une candidature par ID
const deleteCandidature = (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM candidatures WHERE id_candidature = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Erreur lors de la suppression de la candidature :', err);
            return res.status(500).json({ error: 'Erreur lors de la suppression de la candidature' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Candidature non trouvée' });
        }
        res.json({ message: 'Candidature supprimée avec succès' });
    });
};

module.exports = {
    createCandidature,
    getCandidaturesByUserId,
    getCandidaturesByOffreId,
    deleteCandidature,
};