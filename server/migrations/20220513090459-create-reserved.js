"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("reserveds", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      pax: {
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      telephone: {
        type: Sequelize.STRING,
      },
      hour: {
        type: Sequelize.STRING,
      },
      data: {
        type: Sequelize.STRING,
      },
      waiter: {
        type: Sequelize.STRING,
      },
      idRestaurant: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("reserveds");
  },
};
