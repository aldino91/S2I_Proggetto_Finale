const { Reserved, Client } = require("../models/index");

module.exports = {
  AddReserved(req, res) {
    const { pax, name, telephone, hour, data, waiter, idRestaurant, timezone } =
      req.body;

    Client.findOne({
      where: { telephone: telephone, name: name },
    })
      .then(async (res) => {
        if (!res) {
          await Client.create({
            name,
            telephone,
            idRestaurant,
          });

          await Client.findOne({
            where: { telephone: telephone, name: name },
          }).then((res) => {
            Reserved.create({
              pax,
              idClient: res.id,
              hour,
              data,
              waiter,
              idRestaurant,
              timezone,
            });
          });
        } else {
          Reserved.create({
            pax,
            idClient: res.id,
            hour,
            data,
            waiter,
            idRestaurant,
            timezone,
          });
        }
      })
      .then(
        (usuario) => res.status(200).send(usuario),
        res.json({ msg: "dati salvati correttamente!" })
      )
      .catch((error) => res.status(400).send(error));
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

  SearchReservedTimezone(req, res) {
    const { idRestaurant, data, timezone } = req.query;
    Reserved.findAll({
      where: { idRestaurant, data, timezone },
    })
      .then((resp) => {
        res.send(resp);
      })
      .catch((e) => {
        console.log(e);
      });
  },
};
