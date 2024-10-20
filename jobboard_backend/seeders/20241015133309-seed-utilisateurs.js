'use strict';
const bcrypt = require('bcrypt');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Hash passwords for users, recruiters, and admins
        const userHashedPassword = await bcrypt.hash('password123', 10);
        const recruiterHashedPassword = await bcrypt.hash('recruiterpassword', 10);
        const adminHashedPassword = await bcrypt.hash('adminpassword', 10);

        await queryInterface.bulkInsert('Utilisateurs', [
            // Employees
            {
                nom: 'Dupont',
                prenom: 'Jean',
                email: 'jean.dupont@mail.com',
                mot_de_passe: userHashedPassword,
                telephone: '0123456789',
                role: 'employé',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                nom: 'Martin',
                prenom: 'Julie',
                email: 'julie.martin@mail.com',
                mot_de_passe: userHashedPassword,
                telephone: '0987654321',
                role: 'employé',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                nom: 'Taylor',
                prenom: 'Emily',
                email: 'emily.taylor@mail.com',
                mot_de_passe: userHashedPassword,
                telephone: '1112223333',
                role: 'employé',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                nom: 'Johnson',
                prenom: 'Mike',
                email: 'mike.johnson@mail.com',
                mot_de_passe: userHashedPassword,
                telephone: '2223334444',
                role: 'employé',
                createdAt: new Date(),
                updatedAt: new Date()
            },

            // Recruiters
            {
                nom: 'Smith',
                prenom: 'Anna',
                email: 'anna.smith@recruitment.com',
                mot_de_passe: recruiterHashedPassword,
                telephone: '3334445555',
                role: 'recruteur',
                id_entreprise: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                nom: 'Brown',
                prenom: 'James',
                email: 'james.brown@recruitment.com',
                mot_de_passe: recruiterHashedPassword,
                telephone: '4445556666',
                role: 'recruteur',
                id_entreprise: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                nom: 'Wilson',
                prenom: 'Olivia',
                email: 'olivia.wilson@techjobs.com',
                mot_de_passe: recruiterHashedPassword,
                telephone: '5556667777',
                role: 'recruteur',
                id_entreprise: 3,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                nom: 'Anderson',
                prenom: 'Lucas',
                email: 'lucas.anderson@itworld.com',
                mot_de_passe: recruiterHashedPassword,
                telephone: '6667778888',
                role: 'recruteur',
                id_entreprise: 4,
                createdAt: new Date(),
                updatedAt: new Date()
            },

            // Admins
            {
                nom: 'Admin',
                prenom: 'Super',
                email: 'admin@jobboard.com',
                mot_de_passe: adminHashedPassword,
                telephone: '0000000000',
                role: 'admin',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                nom: 'KING',
                prenom: 'KING',
                email: 'KING@GMAIL.COM',
                mot_de_passe: adminHashedPassword,
                telephone: '0000000000',
                role: 'admin',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                nom: 'Lopez',
                prenom: 'Sophie',
                email: 'sophie.lopez@jobboard.com',
                mot_de_passe: adminHashedPassword,
                telephone: '7778889999',
                role: 'admin',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Utilisateurs', null, {});
    }
};
