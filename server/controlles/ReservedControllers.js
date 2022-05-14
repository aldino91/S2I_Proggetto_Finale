const { Reserved } = require("../models/index");

module.exports = {
  AddReserved(req, res) {
    const { pax, name, telephone, hour, data, waiter, idRestaurant } = req.body;

    Reserved.create({
      pax,
      name,
      telephone,
      hour,
      data,
      waiter,
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
