"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Table extends Model {
    static associate(models) {}
  }
  Table.init(
    {
      name: DataTypes.STRING,
      idRestaurant: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Table",
    }
  );
  return Table;
};
