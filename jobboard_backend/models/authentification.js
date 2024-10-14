'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Authentification extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // Définir une relation entre Authentification et Utilisateur
            Authentification.belongsTo(models.Utilisateur, { foreignKey: 'id_utilisateur', as: 'utilisateur' });
        }
    }
    Authentification.init({
        id_utilisateur: DataTypes.INTEGER,
        token: DataTypes.STRING,
        date_creation: DataTypes.DATE,
        date_expiration: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'Authentification',
    });
    return Authentification;
};