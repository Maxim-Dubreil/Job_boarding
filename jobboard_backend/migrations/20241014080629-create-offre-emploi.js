'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('OffreEmplois', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            id_entreprise: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Entreprises', // Référence au modèle Entreprises
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            titre: {
                type: Sequelize.STRING,
                allowNull: false
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            description_p: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            salaire: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: true
            },
            lieu: {
                type: Sequelize.STRING,
                allowNull: true
            },
            region: {
                type: Sequelize.STRING,
                allowNull: true
            },
            type_emploi: {
                type: Sequelize.ENUM('CDI', 'CDD', 'Stage', 'Freelance'),
                allowNull: false
            },
            heures_travail: {
                type: Sequelize.STRING,
                allowNull: true
            },
            mots_cles: {
                type: Sequelize.STRING,
                allowNull: true
            },
            date_publication: {
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
        await queryInterface.dropTable('OffreEmplois');
    }
};