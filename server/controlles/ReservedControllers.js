const { Reserved } = require("../models/index");

module.exports = {
  AddReserved(req, res) {
    const { name, telephone, hour, data, cameriere, idRestaurant } = req.body;

    Reserved.create({
      name,
      telephone,
      hour,
      data,
      cameriere,
      idRestaurant,
    })
      .then((resp) => {
        res.json({ msg: "dati salvati correttamente!" });
      })
      .catch((err) => {
        console.log(err);
        console.log("non siamo riusciti a salvare il ristorante!");
      });
  },
};
