'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // 1 người dùng thuộc về 1 Allcode, 1 - n (thằng hứng số 1: belongsTo) Allcode có nhiều User key phải nằm trên User
      User.belongsTo(models.Allcode, {foreignKey: 'positionId', targetKey: 'keyMap', as: 'positionData'})
      User.belongsTo(models.Allcode, {foreignKey: 'gender', targetKey: 'keyMap', as: 'genderData'})
      User.hasOne(models.Markdown, {foreignKey: 'doctorId'})
      User.hasOne(models.Doctor_Infor, {foreignKey: 'doctorId'})
      User.hasMany(models.Schedule, {foreignKey: 'doctorId', as: 'doctorData'})

      User.hasMany(models.Booking, {foreignKey: 'patientId', as: 'patientData'})

    }
  }
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.STRING,
    phonenumber: DataTypes.STRING,
    gender: DataTypes.STRING,
    image: DataTypes.STRING,
    roleId: DataTypes.STRING,
    positionId: DataTypes.STRING,
    verificationCode: DataTypes.STRING //Thêm trường mới vào model User
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};