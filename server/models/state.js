"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class State extends Model {
    static associate(models) {
      State.belongsTo(models.Reserved, {
        foreignKey: "idReserved",
      });
    }
  }
  State.init(
    {
      statereserved: DataTypes.STRING,
      idReserved: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "State",
    }
  );
  return State;
};
