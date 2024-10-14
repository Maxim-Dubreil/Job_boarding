'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Entreprises', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            nom_entreprise: {
                type: Sequelize.STRING,
                allowNull: false
            },
            secteur_activite: {
                type: Sequelize.STRING
            },
            site_web: {
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.TEXT
            },
            adresse: {
                type: Sequelize.STRING
            },
            region: {
                type: Sequelize.STRING
            },
            telephone: {
                type: Sequelize.STRING
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true // Ajoute une contrainte d'unicité
            },
            date_creation: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW // Ajoute une valeur par défaut
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Entreprises');
    }
};