"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    static associate(models) {
      Restaurant.belongsTo(models.users, {
        as: "author",
        foreignKey: "idUser",
      });
    }
  }
  Restaurant.init(
    {
      name: DataTypes.STRING,
      city: DataTypes.STRING,
      telephone: DataTypes.INTEGER,
      address: DataTypes.STRING,
      idUser: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Restaurant",
    }
  );
  return Restaurant;
};
