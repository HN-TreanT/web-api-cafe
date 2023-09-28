"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("shipment", "price", {
      type: Sequelize.FLOAT, // Điều chỉnh kiểu dữ liệu và độ dài cho cột price
      defaultValue: 0.0, // Giá trị mặc định (nếu cần)
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
