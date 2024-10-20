'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Candidatures', [
            {
                id_offre: 1,
                id_utilisateur: 1,
                nom: 'Jean Dupont',
                email: 'jean.dupont@mail.com',
                telephone: '0123456789',
                message_candidature: 'Je suis très intéressé par le poste de Développeur Full Stack.',
                date_candidature: new Date(),
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id_offre: 2,
                id_utilisateur: 2,
                nom: 'Julie Martin',
                email: 'julie.martin@mail.com',
                telephone: '0987654321',
                message_candidature: 'Je souhaite postuler au poste d\'Analyste Financier.',
                date_candidature: new Date(),
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id_offre: 3,
                id_utilisateur: null,
                nom: 'Anonymous User',
                email: 'anonymous@mail.com',
                telephone: '1234567890',
                message_candidature: 'Je suis passionné par l\'environnement et les projets durables. Merci de considérer ma candidature.',
                date_candidature: new Date(),
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id_offre: 4,
                id_utilisateur: 4,
                nom: 'Mike Johnson',
                email: 'mike.johnson@mail.com',
                telephone: '2223334444',
                message_candidature: 'Je souhaite apporter mon expertise en développement logiciel et participer à vos projets.',
                date_candidature: new Date(),
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id_offre: 5,
                id_utilisateur: null,
                nom: 'Anonymous Applicant',
                email: 'anonyme@random.com',
                telephone: '9876543210',
                message_candidature: 'Je suis prêt à relever des défis dans le domaine de la communication pour votre entreprise.',
                date_candidature: new Date(),
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id_offre: 1,
                id_utilisateur: 6,
                nom: 'Emily Taylor',
                email: 'emily.taylor@mail.com',
                telephone: '1112223333',
                message_candidature: 'Avec mon expérience en développement Full Stack, je suis convaincu de pouvoir apporter une contribution précieuse.',
                date_candidature: new Date(),
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id_offre: 6,
                id_utilisateur: null,
                nom: 'Freelancer Nomade',
                email: 'nomade@freelance.com',
                telephone: '5550001111',
                message_candidature: 'Le poste de Chef de Projet IT m\'intéresse beaucoup. Je suis un freelance passionné par la gestion de projet.',
                date_candidature: new Date(),
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id_offre: 7,
                id_utilisateur: 9,
                nom: 'Olivia Wilson',
                email: 'olivia.wilson@techjobs.com',
                telephone: '5556667777',
                message_candidature: 'Je souhaite mettre à profit mes compétences en design UX/UI pour améliorer les produits de votre entreprise.',
                date_candidature: new Date(),
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id_offre: 8,
                id_utilisateur: 10,
                nom: 'Lucas Anderson',
                email: 'lucas.anderson@itworld.com',
                telephone: '6667778888',
                message_candidature: 'Je postule pour le poste d\'Assistant RH, j\'ai une forte motivation pour développer mes compétences en ressources humaines.',
                date_candidature: new Date(),
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id_offre: 9,
                id_utilisateur: null,
                nom: 'Data Enthusiast',
                email: 'data.enthusiast@gmail.com',
                telephone: '8889991111',
                message_candidature: 'En tant que Data Scientist passionné par l\'analyse de données, je suis ravi de postuler pour ce poste.',
                date_candidature: new Date(),
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id_offre: 10,
                id_utilisateur: 11,
                nom: 'James Brown',
                email: 'james.brown@recruitment.com',
                telephone: '4445556666',
                message_candidature: 'Je suis intéressé par le poste de Technicien Réseau et prêt à apporter mon expertise en réseaux informatiques.',
                date_candidature: new Date(),
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id_offre: 3,
                id_utilisateur: null,
                nom: 'Green Advocate',
                email: 'green.advocate@eco.com',
                telephone: '1010101010',
                message_candidature: 'L\'environnement est ma passion et je serais honoré de contribuer à vos projets verts.',
                date_candidature: new Date(),
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Candidatures', null, {});
    }
};
