'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('OffreEmplois', [{
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
                updatedAt: new Date(),
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
                updatedAt: new Date(),
            },
        ], {});
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('OffreEmplois', null, {});
    }
};