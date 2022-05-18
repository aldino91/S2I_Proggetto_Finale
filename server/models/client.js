"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    static associate(models) {
      Client.belongsTo(models.Restaurant, {
        as: "author",
        foreignKey: "idRestaurant",
      });
      Client.hasMany(models.Reserved, {
        foreignKey: "id",
      });
    }
  }
  Client.init(
    {
      name: DataTypes.STRING,
      telephone: DataTypes.STRING,
      idRestaurant: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Client",
    }
  );
  return Client;
};
