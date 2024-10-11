// controllers/offreController.js
const db = require('../db');

// Créer une nouvelle offre d'emploi
const createOffer = (req, res) => {
    const { id_entreprise, titre, description, description_p, salaire, lieu, region, type_emploi, heures_travail, mots_cles } = req.body;

    const sql = `
        INSERT INTO offres_emploi (id_entreprise, titre, description, description_p, salaire, lieu, region, type_emploi, heures_travail, mots_cles)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(sql, [id_entreprise, titre, description, description_p, salaire, lieu, region, type_emploi, heures_travail, mots_cles], (err, result) => {
        if (err) {
            console.error('Erreur lors de la création de l\'offre d\'emploi :', err);
            return res.status(500).json({ error: 'Erreur lors de la création de l\'offre d\'emploi' });
        }
        res.json({ message: 'Offre d\'emploi créée avec succès', id: result.insertId });
    });
};

// Lire toutes les offres d'emploi avec possibilité de filtrer
const getAllOffers = (req, res) => {
    const { mots_cles, region, type_emploi } = req.query;

    let sql = `
        SELECT o.*, e.nom_entreprise
        FROM offres_emploi o
        JOIN entreprises e ON o.id_entreprise = e.id_entreprise
        WHERE 1=1
    `;
    const params = [];

    if (mots_cles) {
        sql += ` AND o.mots_cles LIKE ?`;
        params.push(`%${mots_cles}%`);
    }

    if (region) {
        sql += ` AND o.region = ?`;
        params.push(region);
    }

    if (type_emploi) {
        sql += ` AND o.type_emploi = ?`;
        params.push(type_emploi);
    }

    db.query(sql, params, (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des offres d\'emploi :', err);
            return res.status(500).json({ error: 'Erreur lors de la récupération des offres d\'emploi' });
        }
        res.json(results);
    });
};

// Lire une offre spécifique
const getOffer = (req, res) => {
    const { id } = req.params;

    const sql = `
        SELECT o.*, e.nom_entreprise
        FROM offres_emploi o
        JOIN entreprises e ON o.id_entreprise = e.id_entreprise
        WHERE o.id_offre = ?
    `;
    db.query(sql, [id], (err, results) => {
        if (err || results.length === 0) {
            return res.status(404).json({ error: 'Offre d\'emploi non trouvée' });
        }
        res.json(results[0]);
    });
};

// Mettre à jour une offre d'emploi
const updateOffer = (req, res) => {
    const { id } = req.params;
    const { titre, description, description_p, salaire, lieu, region, type_emploi, heures_travail, mots_cles } = req.body;

    const sql = `
        UPDATE offres_emploi
        SET titre = ?, description = ?, description_p = ?, salaire = ?, lieu = ?, region = ?, type_emploi = ?, heures_travail = ?, mots_cles = ?
        WHERE id_offre = ?
    `;
    db.query(sql, [titre, description, description_p, salaire, lieu, region, type_emploi, heures_travail, mots_cles, id], (err, result) => {
        if (err) {
            console.error('Erreur lors de la mise à jour de l\'offre d\'emploi :', err);
            return res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'offre d\'emploi' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Offre d\'emploi non trouvée' });
        }
        res.json({ message: 'Offre d\'emploi mise à jour avec succès' });
    });
};

// Supprimer une offre d'emploi
const deleteOffer = (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM offres_emploi WHERE id_offre = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Erreur lors de la suppression de l\'offre d\'emploi :', err);
            return res.status(500).json({ error: 'Erreur lors de la suppression de l\'offre d\'emploi' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Offre d\'emploi non trouvée' });
        }
        res.json({ message: 'Offre d\'emploi supprimée avec succès' });
    });
};

module.exports = {
    createOffer,
    getAllOffers,
    getOffer,
    updateOffer,
    deleteOffer
};