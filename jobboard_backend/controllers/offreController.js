// controllers/offreController.js
const { OffreEmploi, Entreprise } = require('../models');
const { Op } = require('sequelize');

// Créer une nouvelle offre d'emploi
const createOffer = async(req, res) => {
    const { id_entreprise, titre, description, description_p, salaire, lieu, region, type_emploi, heures_travail, mots_cles } = req.body;

    try {
        const newOffer = await OffreEmploi.create({
            id_entreprise,
            titre,
            description,
            description_p,
            salaire,
            lieu,
            region,
            type_emploi,
            heures_travail,
            mots_cles,
        });
        res.json({ message: "Offre d'emploi créée avec succès", id: newOffer.id });
    } catch (error) {
        console.error("Erreur lors de la création de l'offre d'emploi :", error);
        res.status(500).json({ error: "Erreur lors de la création de l'offre d'emploi" });
    }
};

// Lire toutes les offres d'emploi avec possibilité de filtrer
const getAllOffers = async(req, res) => {
    const { mots_cles, region, type_emploi } = req.query;

    const whereClause = {};
    if (mots_cles) whereClause.mots_cles = {
        [Op.like]: `%${mots_cles}%`
    };
    if (region) whereClause.region = region;
    if (type_emploi) whereClause.type_emploi = type_emploi;


    try {
        const offers = await OffreEmploi.findAll({
            where: whereClause,
            include: {
                model: Entreprise,
                as: 'entreprise', // Use the alias defined in the association
                attributes: ['nom_entreprise'],
            },
        });
        res.json(offers);
    } catch (error) {
        console.error("Erreur lors de la récupération des offres d'emploi :", error);
        res.status(500).json({ error: "Erreur lors de la récupération des offres d'emploi" });
    }
};

// Lire une offre spécifique
const getOffer = async(req, res) => {
    const { id } = req.params;

    try {
        const offer = await OffreEmploi.findOne({
            where: { id },
            include: {
                model: Entreprise,
                as: 'entreprise', // Use the alias defined in the association
                attributes: ['nom_entreprise'],
            },
        });
        if (!offer) {
            return res.status(404).json({ error: "Offre d'emploi non trouvée" });
        }
        res.json(offer);
    } catch (error) {
        console.error("Erreur lors de la récupération de l'offre d'emploi :", error);
        res.status(500).json({ error: "Erreur lors de la récupération de l'offre d'emploi" });
    }
};

// Mettre à jour une offre d'emploi
const updateOffer = async(req, res) => {
    const { id } = req.params;
    const { titre, description, description_p, salaire, lieu, region, type_emploi, heures_travail, mots_cles } = req.body;

    try {
        const [updatedRows] = await OffreEmploi.update({
            titre,
            description,
            description_p,
            salaire,
            lieu,
            region,
            type_emploi,
            heures_travail,
            mots_cles,
        }, {
            where: { id },
        });

        if (updatedRows === 0) {
            return res.status(404).json({ error: "Offre d'emploi non trouvée" });
        }
        res.json({ message: "Offre d'emploi mise à jour avec succès" });
    } catch (error) {
        console.error("Erreur lors de la mise à jour de l'offre d'emploi :", error);
        res.status(500).json({ error: "Erreur lors de la mise à jour de l'offre d'emploi" });
    }
};

// Supprimer une offre d'emploi
const deleteOffer = async(req, res) => {
    const { id } = req.params;

    try {
        const deletedRows = await OffreEmploi.destroy({
            where: { id },
        });
        if (deletedRows === 0) {
            return res.status(404).json({ error: "Offre d'emploi non trouvée" });
        }
        res.json({ message: "Offre d'emploi supprimée avec succès" });
    } catch (error) {
        console.error("Erreur lors de la suppression de l'offre d'emploi :", error);
        res.status(500).json({ error: "Erreur lors de la suppression de l'offre d'emploi" });
    }
};



// Lire toutes les offres d'emploi d'une certaines entreprise
const getAllEntrepriseOffers = async(req, res) => {
    console.log(`voici req.params ${req.params}`)
    const { id_entreprise } = req.params;



    try {
        const offers = await OffreEmploi.findAll({
            where: { id_entreprise },
            include: {
                model: Entreprise,
                as: 'entreprise', // Use the alias defined in the association
                attributes: ['nom_entreprise'],
            },
        });
        res.json(offers);
    } catch (error) {
        console.error("Erreur lors de la récupération des offres d'emploi :", error);
        res.status(500).json({ error: "Erreur lors de la récupération des offres d'emploi" });
    }
};

module.exports = {
    createOffer,
    getAllOffers,
    getOffer,
    updateOffer,
    deleteOffer,
    getAllEntrepriseOffers, // Add the new function here
};