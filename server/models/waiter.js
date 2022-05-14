"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class waiter extends Model {
    static associate(models) {
      waiter.belongsTo(models.Restaurant, {
        foreignKey: "idRestaurant",
      });
    }
  }
  waiter.init(
    {
      name: DataTypes.STRING,
      idRestaurant: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "waiter",
    }
  );
  return waiter;
};
