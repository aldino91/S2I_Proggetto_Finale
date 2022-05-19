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
      idClient: {
        type: Sequelize.INTEGER,
        references: { model: "clients", key: "id" },
        onDelete: "CASCADE",
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
        type: Sequelize.INTEGER,
        references: { model: "Restaurants", key: "id" },
        onDelete: "CASCADE",
      },
      timezone: {
        type: Sequelize.STRING,
      },
      idState: {
        type: Sequelize.INTEGER,
        references: { model: "states", key: "id" },
        onDelete: "CASCADE",
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
