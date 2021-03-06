"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Reserved extends Model {
    static associate(models) {
      Reserved.belongsTo(models.Restaurant, {
        as: "author",
        foreignKey: "idRestaurant",
        onDelete: "CASCADE",
      });
      Reserved.belongsTo(models.State, {
        foreignKey: "idState",
        onDelete: "CASCADE",
      });
    }
  }
  Reserved.init(
    {
      pax: DataTypes.INTEGER,
      client: DataTypes.STRING,
      hour: DataTypes.STRING,
      data: DataTypes.STRING,
      telephone: DataTypes.INTEGER,
      waiter: DataTypes.STRING,
      idRestaurant: DataTypes.STRING,
      timezone: DataTypes.STRING,
      idState: DataTypes.INTEGER,
      tables: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Reserved",
    }
  );
  return Reserved;
};
