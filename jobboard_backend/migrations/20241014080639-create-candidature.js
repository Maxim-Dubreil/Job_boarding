// Migration mise à jour pour Candidatures
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Candidatures', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            id_offre: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'OffreEmplois', // Référence au modèle OffreEmplois
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            id_utilisateur: {
                type: Sequelize.INTEGER,
                allowNull: true, // Peut être null pour les utilisateurs non connectés
                references: {
                    model: 'Utilisateurs', // Référence au modèle Utilisateurs
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            nom: {
                type: Sequelize.STRING,
                allowNull: true, // Nom du candidat (utilisé si non connecté)
            },
            email: {
                type: Sequelize.STRING,
                allowNull: true, // Email du candidat (utilisé si non connecté)
            },
            telephone: {
                type: Sequelize.STRING,
                allowNull: true, // Téléphone du candidat (utilisé si non connecté)
            },
            message_candidature: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            date_candidature: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Candidatures');
    }
};
