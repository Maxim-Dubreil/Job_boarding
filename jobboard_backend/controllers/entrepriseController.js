// controllers/entrepriseController.js
const db = require('../db');

// Créer une nouvelle entreprise
const createEntreprise = (req, res) => {
    const { nom_entreprise, secteur_activite, site_web, description, adresse, region, telephone, email } = req.body;

    const sql = `
        INSERT INTO entreprises (nom_entreprise, secteur_activite, site_web, description, adresse, region, telephone, email)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(sql, [nom_entreprise, secteur_activite, site_web, description, adresse, region, telephone, email], (err, result) => {
        if (err) {
            console.error('Erreur lors de la création de l\'entreprise :', err);
            return res.status(500).json({ error: 'Erreur lors de la création de l\'entreprise' });
        }
        res.json({ message: 'Entreprise créée avec succès', id: result.insertId });
    });
};

// Récupérer les informations d'une entreprise par ID
const getEntrepriseById = (req, res) => {
    const { id } = req.params;

    const sql = 'SELECT * FROM entreprises WHERE id_entreprise = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération de l\'entreprise :', err);
            return res.status(500).json({ error: 'Erreur lors de la récupération de l\'entreprise' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Entreprise non trouvée' });
        }
        res.json(results[0]);
    });
};

// Mettre à jour les informations d'une entreprise
const updateEntreprise = (req, res) => {
    const { id } = req.params;
    const { nom_entreprise, secteur_activite, site_web, description, adresse, region, telephone, email } = req.body;

    const sql = `
        UPDATE entreprises
        SET nom_entreprise = ?, secteur_activite = ?, site_web = ?, description = ?, adresse = ?, region = ?, telephone = ?, email = ?
        WHERE id_entreprise = ?
    `;
    db.query(sql, [nom_entreprise, secteur_activite, site_web, description, adresse, region, telephone, email, id], (err, result) => {
        if (err) {
            console.error('Erreur lors de la mise à jour de l\'entreprise :', err);
            return res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'entreprise' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Entreprise non trouvée' });
        }
        res.json({ message: 'Entreprise mise à jour avec succès' });
    });
};

// Supprimer une entreprise
const deleteEntreprise = (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM entreprises WHERE id_entreprise = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Erreur lors de la suppression de l\'entreprise :', err);
            return res.status(500).json({ error: 'Erreur lors de la suppression de l\'entreprise' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Entreprise non trouvée' });
        }
        res.json({ message: 'Entreprise supprimée avec succès' });
    });
};

module.exports = {
    createEntreprise,
    getEntrepriseById,
    updateEntreprise,
    deleteEntreprise,
};