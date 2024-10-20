'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Candidature extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // Définir une relation entre Candidature et Utilisateur
            Candidature.belongsTo(models.Utilisateur, { foreignKey: 'id_utilisateur', as: 'utilisateur' });

            // Définir une relation entre Candidature et OffreEmploi
            Candidature.belongsTo(models.OffreEmploi, { foreignKey: 'id_offre', as: 'offre' });
        }
    }
    Candidature.init({
        id_offre: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id_utilisateur: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        nom: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true
        },
        telephone: {
            type: DataTypes.STRING,
            allowNull: true
        },
        message_candidature: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        date_candidature: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    }, {
        sequelize,
        modelName: 'Candidature',
    });
    return Candidature;
};
