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

  DeleteTables(req, res) {
    const id = req.params.id;
    try {
      Table.findOne({
        where: {
          id: id,
        },
      }).then((table) => {
        if (!table) {
          res.send("Non abbiamo trovato il tavolo!");
          console.log("non abbiamo trovato il tavolo");
        } else {
          Table.destroy({
            where: {
              id: id,
            },
          });
          res.json({ msg: "tavolo cancellato con successo" });
          console.log("tavolo cancellato con successo!");
        }
      });
    } catch (error) {
      console.log(error);
    }
  },
};
