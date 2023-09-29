"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("employee", "name", {
      type: Sequelize.STRING, // Kiểu dữ liệu của cột
      allowNull: false, // Cho phép giá trị null hay không
      defaultValue: "", // Giá trị mặc định (nếu có)
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
