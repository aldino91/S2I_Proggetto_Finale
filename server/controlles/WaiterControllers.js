const { Waiter } = require("../models/index");

module.exports = {
  AddWaiter(req, res) {
    const { name, idRestaurant } = req.body;

    Waiter.create({
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

    Waiter.findAll({
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
      Waiter.findOne({
        where: {
          id: id,
        },
      }).then((resp) => {
        if (!resp) {
          res.send("Non abbiamo trovato il cameriere");
        } else {
          Waiter.destroy({
            where: {
              id: id,
            },
          });
          res.json({ msg: "Cameriere eliminato con successo!" });
        }
      });
    } catch (error) {
      console.log(error);
    }
  },
};
