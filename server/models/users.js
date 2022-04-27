"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    static associate(models) {}
  }
  users.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: { msg: "il nome non puó contenere numeri" },
          len: {
            args: [2, 255],
            msg: "il nome deve contenere almeno 2 caratteri",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: { isEmail: { msg: "l'email deve essere un email valido" } },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [4, 255],
            msg: "la password deve avere almeno 4 caratteri",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "users",
    }
  );
  return users;
};
