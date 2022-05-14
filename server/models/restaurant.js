"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    static associate(models) {
      Restaurant.belongsTo(models.users, {
        as: "author",
        foreignKey: "idUser",
      });
      Restaurant.hasMany(models.Reserved, {
        foreignKey: "id",
      });
      Restaurant.hasMany(models.waiter, {
        foreignKey: "id",
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
