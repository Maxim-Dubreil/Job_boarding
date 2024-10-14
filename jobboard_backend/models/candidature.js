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
        id_offre: DataTypes.INTEGER,
        id_utilisateur: DataTypes.INTEGER,
        message_candidature: DataTypes.TEXT,
        date_candidature: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'Candidature',
    });
    return Candidature;
};