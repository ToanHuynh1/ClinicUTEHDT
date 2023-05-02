'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    
    }
  }
  Review.init({
    doctorId: DataTypes.INTEGER,
    patientName: DataTypes.STRING,
    date: DataTypes.STRING,
    patientId: DataTypes.INTEGER,
    status: DataTypes.TEXT('long'),
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};