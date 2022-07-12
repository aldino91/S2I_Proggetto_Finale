const { Waiter } = require("../models/index");

module.exports = {
  async AddWaiter(req, res) {
    const { name, idRestaurant } = req.body;
    try {
      const waiter = await Waiter.create({
        name,
        idRestaurant,
      });
      res.sendStatus(200);
    } catch (error) {
      console.log(err);
      console.log("non siamo riusciti a salvare il cameriere!");
    }
  },

  async GetWaiters(req, res) {
    const idRestaurant = req.params.idRestaurant;

    try {
      const waiter = await Waiter.findAll({
        where: { idRestaurant: idRestaurant },
      });
      res.send(waiter);
    } catch (error) {
      console.log(error);
    }
  },

  async DeleteWaiter(req, res) {
    const id = req.params.id;
    try {
      const waiter = await Waiter.findOne({
        where: {
          id: id,
        },
      });

      if (!waiter) {
        res.send("Non abbiamo trovato il cameriere");
      } else {
        Waiter.destroy({
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
