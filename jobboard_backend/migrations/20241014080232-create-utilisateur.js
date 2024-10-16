'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Utilisateurs', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            nom: {
                type: Sequelize.STRING,
                allowNull: false
            },
            prenom: {
                type: Sequelize.STRING,
                allowNull: false
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            mot_de_passe: {
                type: Sequelize.STRING,
                allowNull: false
            },
            telephone: {
                type: Sequelize.STRING,
                allowNull: true
            },
            adresse: {
                type: Sequelize.STRING,
                allowNull: true
            },
            role: {
                type: Sequelize.ENUM('employé', 'recruteur', 'admin'),
                allowNull: false
            },
            id_entreprise: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'Entreprises', // Modifiez le nom pour correspondre à celui défini précédemment
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            },
            chemin_cv: {
                type: Sequelize.STRING,
                allowNull: true
            },
            date_inscription: {
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
        await queryInterface.dropTable('Utilisateurs');
    }
};