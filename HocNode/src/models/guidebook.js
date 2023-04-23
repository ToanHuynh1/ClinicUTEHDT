'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Guidebook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Guidebook.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,   
    descriptionMardown: DataTypes.TEXT,
    descriptionHTML: DataTypes.TEXT,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Guidebook',
  });
  return Guidebook;
};