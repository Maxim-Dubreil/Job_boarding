'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Entreprises', [{
            nom_entreprise: 'Entreprise King',
            secteur_activite: 'Technologie',
            site_web: 'https://www.kingtech.com',
            description: 'Entreprise de pointe dans le secteur technologique.',
            adresse: '123 Rue de Paris, Paris',
            region: 'Ile-de-France',
            telephone: '0123456789',
            email: 'contact@kingtech.com',
            date_creation: new Date()

        }], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Entreprises', null, {});
    }
};