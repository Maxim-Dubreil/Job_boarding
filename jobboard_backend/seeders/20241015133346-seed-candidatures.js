'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Candidatures', [{
                id_offre: 1,
                id_utilisateur: 1,
                message_candidature: 'Je suis très intéressé par le poste de Développeur Full Stack.',
                date_candidature: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id_offre: 2,
                id_utilisateur: 2,
                message_candidature: 'Je souhaite postuler au poste d\'Analyste Financier.',
                date_candidature: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ], {});
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Candidatures', null, {});
    }
};