'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Utilisateur extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // Définir une relation entre Utilisateur et Entreprise (seulement pour les recruteurs)
            Utilisateur.belongsTo(models.Entreprise, {
                foreignKey: 'id_entreprise',
                as: 'entreprise',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            });

            // Définir une relation entre Utilisateur et Candidature
            Utilisateur.hasMany(models.Candidature, {
                foreignKey: 'id_utilisateur',
                as: 'candidatures',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
        }
    }
    Utilisateur.init({
        nom: DataTypes.STRING,
        prenom: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        mot_de_passe: DataTypes.STRING,
        telephone: DataTypes.STRING,
        adresse: DataTypes.STRING,
        role: {
            type: DataTypes.ENUM('employé', 'recruteur'),
            allowNull: false
        },
        id_entreprise: DataTypes.INTEGER,
        chemin_cv: DataTypes.STRING,
        date_inscription: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        sequelize,
        modelName: 'Utilisateur',
    });
    return Utilisateur;
};