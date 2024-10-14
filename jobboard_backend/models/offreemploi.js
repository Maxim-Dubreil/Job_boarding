'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class OffreEmploi extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // Définir une relation entre OffreEmploi et Entreprise
            OffreEmploi.belongsTo(models.Entreprise, {
                foreignKey: 'id_entreprise',
                as: 'entreprise'
            });

            // Définir une relation entre OffreEmploi et Candidature
            OffreEmploi.hasMany(models.Candidature, {
                foreignKey: 'id_offre',
                as: 'candidatures'
            });
        }
    }
    OffreEmploi.init({
        id_entreprise: DataTypes.INTEGER,
        titre: DataTypes.STRING,
        description: DataTypes.TEXT,
        description_p: DataTypes.TEXT,
        salaire: DataTypes.DECIMAL,
        lieu: DataTypes.STRING,
        region: DataTypes.STRING,
        type_emploi: DataTypes.ENUM('CDI', 'CDD', 'Stage', 'Freelance'),
        heures_travail: DataTypes.STRING,
        mots_cles: DataTypes.STRING,
        date_publication: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'OffreEmploi',
    });
    return OffreEmploi;
};