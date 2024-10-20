'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('OffreEmplois', [
            {
                id_entreprise: 1,
                titre: 'Développeur Full Stack',
                description: 'Développeur avec expérience en JavaScript et Python',
                description_p: 'Offre pour développeur Full Stack',
                salaire: 45000,
                lieu: 'Paris',
                region: 'Ile-de-France',
                type_emploi: 'CDI',
                heures_travail: '35 heures',
                mots_cles: 'JavaScript, Full Stack, Python',
                date_publication: new Date(),
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id_entreprise: 2,
                titre: 'Analyste Financier',
                description: 'Expert en analyse financière et gestion de portefeuille',
                description_p: 'Offre pour analyste financier',
                salaire: 55000,
                lieu: 'Lyon',
                region: 'Auvergne-Rhône-Alpes',
                type_emploi: 'CDI',
                heures_travail: '40 heures',
                mots_cles: 'Finance, Gestion de portefeuille',
                date_publication: new Date(),
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id_entreprise: 3,
                titre: 'Consultant en Environnement',
                description: 'Conseiller en projets durables et écologiques',
                description_p: 'Consultant spécialisé en environnement',
                salaire: 40000,
                lieu: 'Bordeaux',
                region: 'Nouvelle-Aquitaine',
                type_emploi: 'CDD',
                heures_travail: '30 heures',
                mots_cles: 'Environnement, Durable, Écologie',
                date_publication: new Date(),
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id_entreprise: 4,
                titre: 'Ingénieur Logiciel',
                description: 'Expérience en développement logiciel avec C++ et Java',
                description_p: 'Ingénieur pour développement d’applications',
                salaire: 60000,
                lieu: 'Marseille',
                region: 'Provence-Alpes-Côte d\'Azur',
                type_emploi: 'CDI',
                heures_travail: '40 heures',
                mots_cles: 'C++, Java, Développement Logiciel',
                date_publication: new Date(),
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id_entreprise: 5,
                titre: 'Chargé de Communication',
                description: 'Responsable de la communication interne et externe de l\'entreprise',
                description_p: 'Offre pour chargé de communication',
                salaire: 38000,
                lieu: 'Nantes',
                region: 'Pays de la Loire',
                type_emploi: 'CDI',
                heures_travail: '35 heures',
                mots_cles: 'Communication, Relations publiques',
                date_publication: new Date(),
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id_entreprise: 1,
                titre: 'Chef de Projet IT',
                description: 'Coordination et gestion de projets informatiques',
                description_p: 'Offre pour Chef de Projet IT',
                salaire: 70000,
                lieu: 'Paris',
                region: 'Ile-de-France',
                type_emploi: 'Freelance',
                heures_travail: '20 heures',
                mots_cles: 'Gestion de projet, IT, Scrum, Agile',
                date_publication: new Date(),
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id_entreprise: 2,
                titre: 'Designer UX/UI',
                description: 'Création d\'interfaces utilisateur conviviales et intuitives',
                description_p: 'Designer UX/UI pour une entreprise technologique',
                salaire: 50000,
                lieu: 'Lille',
                region: 'Hauts-de-France',
                type_emploi: 'CDI',
                heures_travail: '35 heures',
                mots_cles: 'Design, UX, UI, Photoshop, Figma',
                date_publication: new Date(),
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id_entreprise: 3,
                titre: 'Assistant Ressources Humaines',
                description: 'Soutien administratif et gestion des ressources humaines',
                description_p: 'Offre pour Assistant RH',
                salaire: 32000,
                lieu: 'Toulouse',
                region: 'Occitanie',
                type_emploi: 'Stage',
                heures_travail: '25 heures',
                mots_cles: 'RH, Administration, Stagiaire',
                date_publication: new Date(),
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id_entreprise: 4,
                titre: 'Data Scientist',
                description: 'Analyse de données complexes et développement de modèles prédictifs',
                description_p: 'Offre pour Data Scientist',
                salaire: 80000,
                lieu: 'Nice',
                region: 'Provence-Alpes-Côte d\'Azur',
                type_emploi: 'CDI',
                heures_travail: '40 heures',
                mots_cles: 'Data Science, Machine Learning, Python, R',
                date_publication: new Date(),
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id_entreprise: 5,
                titre: 'Technicien Réseau',
                description: 'Installation et maintenance des réseaux informatiques',
                description_p: 'Offre pour Technicien Réseau',
                salaire: 35000,
                lieu: 'Strasbourg',
                region: 'Grand Est',
                type_emploi: 'CDD',
                heures_travail: '37 heures',
                mots_cles: 'Réseau, IT, Cisco',
                date_publication: new Date(),
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('OffreEmplois', null, {});
    }
};
