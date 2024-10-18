'use strict';
const bcrypt = require('bcrypt');

module.exports = {
    up: async(queryInterface, Sequelize) => {
        // Hash passwords for users and admin
        const userHashedPassword = await bcrypt.hash('password123', 10);
        const adminHashedPassword = await bcrypt.hash('adminpassword', 10);
        const admin2HashedPassword = await bcrypt.hash('KING', 10);

        await queryInterface.bulkInsert('Utilisateurs', [{
                nom: 'Dupont',
                prenom: 'Jean',
                email: 'jean.dupont@mail.com',
                mot_de_passe: userHashedPassword,
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
                mot_de_passe: userHashedPassword,
                telephone: '0987654321',
                adresse: '789 Boulevard de Strasbourg, Lille',
                role: 'employé',
                id_entreprise: null,
                chemin_cv: '/uploads/cv/julie_martin.pdf',
                date_inscription: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                nom: 'Admin',
                prenom: 'Super',
                email: 'admin@jobboard.com',
                mot_de_passe: admin2HashedPassword,
                telephone: '0000000000',
                adresse: 'Admin Office',
                role: 'admin',
                id_entreprise: null,
                chemin_cv: null,
                date_inscription: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                nom: 'KING',
                prenom: 'KING',
                email: 'KING@GMAIL.COM',
                mot_de_passe: adminHashedPassword,
                telephone: '0000000000',
                adresse: 'Admin Office',
                role: 'admin',
                id_entreprise: null,
                chemin_cv: null,
                date_inscription: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ], {});
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Utilisateurs', null, {});
    }
};