const express = require("express");
const app = express();
const { sequelize } = require("./models/index");
const router = require("./routers/index");

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

app.listen(PORT, () => {
  console.log(`Siamo nel port: ${PORT}`);

  sequelize.authenticate().then(() => {
    console.log("Ci siamo connessi correctamente al database!!!");
  });
});
