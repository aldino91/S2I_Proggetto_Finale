"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Reserved extends Model {
    static associate(models) {
      /* Reserved.belongsTo(models.restaurant, {
        as: "author",
        foreignKey: "idRestaurant",
      }); */
    }
  }
  Reserved.init(
    {
      name: DataTypes.STRING,
      telephone: DataTypes.STRING,
      hour: DataTypes.STRING,
      data: DataTypes.STRING,
      cameriere: DataTypes.STRING,
      idRestaurant: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Reserved",
    }
  );
  return Reserved;
};
