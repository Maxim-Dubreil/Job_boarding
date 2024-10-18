// controllers/entrepriseController.js
const { Entreprise } = require('../models');

// Créer une nouvelle entreprise
const createEntreprise = async(req, res) => {
    const { nom_entreprise, secteur_activite, site_web, description, adresse, region, telephone, email } = req.body;
    try {
        const entreprise = await Entreprise.create({
            nom_entreprise,
            secteur_activite,
            site_web,
            description,
            adresse,
            region,
            telephone,
            email
        });
        res.json({ message: 'Entreprise créée avec succès', id: entreprise.id });
    } catch (err) {
        console.error('Erreur lors de la création de l\'entreprise :', err);
        res.status(500).json({ error: 'Erreur lors de la création de l\'entreprise' });
    }
};

// Récupérer les informations d'une entreprise par ID
const getEntrepriseById = async(req, res) => {
    const { id } = req.params;
    try {
        const entreprise = await Entreprise.findByPk(id);
        if (!entreprise) {
            return res.status(404).json({ error: 'Entreprise non trouvée' });
        }
        res.json(entreprise);
    } catch (err) {
        console.error('Erreur lors de la récupération de l\'entreprise :', err);
        res.status(500).json({ error: 'Erreur lors de la récupération de l\'entreprise' });
    }
};
// Récupérer toutes les entreprises
const getAllEntreprises = async(req, res) => {
    try {
        const entreprises = await Entreprise.findAll();
        res.json(entreprises);
    } catch (err) {
        console.error('Erreur lors de la récupération des entreprises :', err);
        res.status(500).json({ error: 'Erreur lors de la récupération des entreprises' });
    }
};


// Mettre à jour les informations d'une entreprise
const updateEntreprise = async(req, res) => {
    const { id } = req.params;
    const { nom_entreprise, secteur_activite, site_web, description, adresse, region, telephone, email } = req.body;
    try {
        const [updated] = await Entreprise.update({
            nom_entreprise,
            secteur_activite,
            site_web,
            description,
            adresse,
            region,
            telephone,
            email
        }, {
            where: { id }
        });
        if (updated === 0) {
            return res.status(404).json({ error: 'Entreprise non trouvée' });
        }
        res.json({ message: 'Entreprise mise à jour avec succès' });
    } catch (err) {
        console.error('Erreur lors de la mise à jour de l\'entreprise :', err);
        res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'entreprise' });
    }
};

// Supprimer une entreprise
const deleteEntreprise = async(req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Entreprise.destroy({
            where: { id }
        });
        if (deleted === 0) {
            return res.status(404).json({ error: 'Entreprise non trouvée' });
        }
        res.json({ message: 'Entreprise supprimée avec succès' });
    } catch (err) {
        console.error('Erreur lors de la suppression de l\'entreprise :', err);
        res.status(500).json({ error: 'Erreur lors de la suppression de l\'entreprise' });
    }
};

module.exports = {
    createEntreprise,
    getEntrepriseById,
    updateEntreprise,
    deleteEntreprise,
    getAllEntreprises,

};