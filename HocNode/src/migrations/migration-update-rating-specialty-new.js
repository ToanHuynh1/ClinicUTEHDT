'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Specialties', 'rating', {
      type: Sequelize.INTEGER // Loại dữ liệu của cột rating
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Specialties', 'rating');
  }
};
