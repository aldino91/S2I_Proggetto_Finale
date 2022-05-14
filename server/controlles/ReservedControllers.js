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

  SearchReserved(req, res) {
    const { idRestaurant, data, hour } = req.query;

    Reserved.findAll({
      where: { idRestaurant, data, hour },
    })
      .then((resp) => {
        res.send(resp);
      })
      .catch((e) => {
        console.log(e);
      });
  },
};
