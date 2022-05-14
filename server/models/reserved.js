"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Reserved extends Model {
    static associate(models) {
      Reserved.belongsTo(models.Restaurant, {
        foreignKey: "idRestaurant",
      });
    }
  }
  Reserved.init(
    {
      pax: DataTypes.INTEGER,
      name: DataTypes.STRING,
      telephone: DataTypes.STRING,
      hour: DataTypes.STRING,
      data: DataTypes.STRING,
      waiter: DataTypes.STRING,
      idRestaurant: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Reserved",
    }
  );
  return Reserved;
};
