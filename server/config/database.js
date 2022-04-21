require("dotenv").config();

module.exports = {
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || null,
  database: process.env.DB_DATABASE || "S2I_FINALE",
  host: process.env.DB_HOST || "localhost",
  dialect: process.env.DB_DIALECT || "mysql",

  seederStorage: "sequelize",
  seederStorageTableName: "seeds",

  migrationStorage: "sequelize",
  migrationStorageTableName: "migrations",
};
