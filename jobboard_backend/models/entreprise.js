'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Entreprise extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // Définir une relation entre Entreprise et Utilisateur (recruteurs)
            Entreprise.hasMany(models.Utilisateur, { foreignKey: 'id_entreprise', as: 'utilisateurs' });

            // Définir une relation entre Entreprise et OffreEmploi
            Entreprise.hasMany(models.OffreEmploi, { foreignKey: 'id_entreprise', as: 'offres' });
        }
    }
    Entreprise.init({
        nom_entreprise: DataTypes.STRING,
        secteur_activite: DataTypes.STRING,
        site_web: DataTypes.STRING,
        description: DataTypes.TEXT,
        adresse: DataTypes.STRING,
        region: DataTypes.STRING,
        telephone: DataTypes.STRING,
        email: DataTypes.STRING,
        date_creation: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'Entreprise',
    });
    return Entreprise;
};