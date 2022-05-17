"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Waiter extends Model {
    static associate(models) {
      Waiter.belongsTo(models.Restaurant, {
        foreignKey: "idRestaurant",
        onDelete: "CASCADE",
      });
    }
  }
  Waiter.init(
    {
      name: DataTypes.STRING,
      idRestaurant: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Waiter",
    }
  );
  return Waiter;
};
