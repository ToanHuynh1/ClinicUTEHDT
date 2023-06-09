'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      doctorId: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      patientName: {
        allowNull: true,
        type: Sequelize.STRING
      },
      date: {
        allowNull: true,
        type: Sequelize.STRING
      },
      patientId: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      status: {
        allowNull: false,
        type: Sequelize.TEXT('long')
      },
      rating: { // Thêm cột rating
        allowNull: true,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('reviews');
  }
};
