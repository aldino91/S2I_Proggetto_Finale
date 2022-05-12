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
};
