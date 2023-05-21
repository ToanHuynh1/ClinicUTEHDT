'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'rating', {
      type: Sequelize.INTEGER // Loại dữ liệu của cột rating
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'rating');
  }
};
