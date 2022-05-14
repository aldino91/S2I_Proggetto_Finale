const { waiter } = require("../models/index");

module.exports = {
  AddWaiter(req, res) {
    const { name, idRestaurant } = req.body;

    waiter
      .create({
        name,
        idRestaurant,
      })
      .then((resp) => {
        res.json({ msg: "dati salvati correttamente!" });
      })
      .catch((err) => {
        console.log(err);
        console.log("non siamo riusciti a salvare il cameriere!");
      });
  },

  GetWaiters(req, res) {
    const idRestaurant = req.params.idRestaurant;

    waiter
      .findAll({
        where: { idRestaurant: idRestaurant },
      })
      .then((resp) => {
        res.send(resp);
      })
      .catch((e) => {
        console.log(e);
      });
  },

  DeleteWaiter(req, res) {
    const id = req.params.id;
    try {
      const resp = waiter.findOne({
        where: {
          id: id,
        },
      });
      if (!resp) {
        res.send("Non abbiamo trovato il cameriere");
      } else {
        waiter.destroy({
          where: {
            id: id,
          },
        });
        res.json({ msg: "Cameriere eliminato con successo!" });
      }
    } catch (error) {
      console.log(error);
    }
  },
};
