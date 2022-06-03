const { Table } = require("../models/index");

module.exports = {
  async AddTables(req, res) {
    const { name, idRestaurant } = req.body;

    try {
      await Table.create({
        name,
        idRestaurant,
      });
      await res.json({ msg: "tavolo aggiunto" });
    } catch (error) {
      console.log(error);
    }
  },

  GetTables(req, res) {
    const idRestaurant = req.params.id;
    Table.findAll({
      where: {
        idRestaurant: idRestaurant,
      },
    })
      .then((resp) => {
        res.send(resp);
      })
      .catch((e) => {
        console.log(e);
      });
  },
};
