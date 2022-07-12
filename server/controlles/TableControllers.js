const { Table } = require("../models/index");

module.exports = {
  async AddTables(req, res) {
    const { name, idRestaurant } = req.body;

    try {
      await Table.create({
        name,
        idRestaurant,
      });
      res.json({ msg: "tavolo aggiunto" });
    } catch (error) {
      console.log(error);
    }
  },

  async GetTables(req, res) {
    const idRestaurant = req.params.id;
    try {
      const table = await Table.findAll({
        where: {
          idRestaurant: idRestaurant,
        },
      });
      res.send(table);
    } catch (error) {
      console.log(error);
    }
  },

  async DeleteTables(req, res) {
    const id = req.params.id;
    try {
      const table = await Table.findOne({
        where: {
          id: id,
        },
      });

      if (!table) {
        res.send("Non abbiamo trovato il tavolo!");
        console.log("non abbiamo trovato il tavolo");
      } else {
        Table.destroy({
          where: {
            id: id,
          },
        });
        res.sendStatus(200);
      }
    } catch (error) {
      console.log(error);
    }
  },
};
