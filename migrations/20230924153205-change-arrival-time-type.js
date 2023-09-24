"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("workshift", "arrival_time", {
      type: Sequelize.TIME,
    });
    await queryInterface.changeColumn("workshift", "end_time", {
      type: Sequelize.TIME,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
