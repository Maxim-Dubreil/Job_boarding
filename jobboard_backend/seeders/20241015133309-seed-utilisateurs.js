'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Utilisateurs', [{
                nom: 'Dupont',
                prenom: 'Jean',
                email: 'jean.dupont@mail.com',
                mot_de_passe: 'hashed_password',
                telephone: '0123456789',
                adresse: '123 Rue de Lyon, Paris',
                role: 'employé',
                id_entreprise: null,
                chemin_cv: '/uploads/cv/jean_dupont.pdf',
                date_inscription: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                nom: 'Martin',
                prenom: 'Julie',
                email: 'julie.martin@mail.com',
                mot_de_passe: 'hashed_password',
                telephone: '0987654321',
                adresse: '789 Boulevard de Strasbourg, Lille',
                role: 'employé',
                id_entreprise: null,
                chemin_cv: '/uploads/cv/julie_martin.pdf',
                date_inscription: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ], {});
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Utilisateurs', null, {});
    }
};