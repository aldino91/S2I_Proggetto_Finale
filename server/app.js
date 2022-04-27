const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const { sequelize } = require("./models/index");
const router = require("./routers/index");

app.use(cors());
require("dotenv").config({ path: "./.env" });
const PORT = process.env.PORT || 9000;
app.use(bodyparser.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(PORT, () => {
  console.log(`Siamo nel port: ${PORT}`);

  sequelize.authenticate().then(() => {
    console.log("Ci siamo connessi correctamente al database!!!");
  });
});
