'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Entreprises', [{
                nom_entreprise: 'Entreprise A',
                secteur_activite: 'Technologie',
                site_web: 'https://www.entreprisea.com',
                description: 'Entreprise spécialisée en technologie',
                adresse: '123 Rue de Paris, Paris',
                region: 'Ile-de-France',
                telephone: '0123456789',
                email: 'contact@entreprisea.com',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                nom_entreprise: 'Entreprise B',
                secteur_activite: 'Finance',
                site_web: 'https://www.entrepriseb.com',
                description: 'Entreprise dans le secteur financier',
                adresse: '456 Avenue de Lyon, Lyon',
                region: 'Auvergne-Rhône-Alpes',
                telephone: '0987654321',
                email: 'contact@entrepriseb.com',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ], {});
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Entreprises', null, {});
    }
};