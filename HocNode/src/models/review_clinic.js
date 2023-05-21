'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review_clinic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Review_clinic.init({
    clinicId: DataTypes.INTEGER,
    patientId: DataTypes.INTEGER,
    rating: DataTypes.INTEGER, // Thêm cột đánh giá số sao
  }, {
    sequelize,
    modelName: 'Review_clinic',
  });
  return Review_clinic;
};
