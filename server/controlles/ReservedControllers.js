const { Reserved, Client, State } = require("../models/index");

module.exports = {
  async AddReserved(req, res) {
    const { pax, name, telephone, hour, data, waiter, idRestaurant, timezone } =
      req.body;

    await Client.findOne({
      where: { telephone: telephone, name: name },
    })
      .then(async (res) => {
        if (!res) {
          await Client.create({
            name,
            telephone,
            idRestaurant,
          });

          await State.create({
            statereserved: "reservation made",
          }).then((resp) => {
            Client.findOne({
              where: { telephone, name },
            }).then(async (res) => {
              Reserved.create({
                pax,
                idClient: res.id,
                hour,
                data,
                waiter,
                idRestaurant,
                timezone,
                idState: resp.id,
              });
            });
          });
        } else {
          await State.create({
            statereserved: "reservation made",
          }).then((resp) => {
            Client.findOne({
              where: { telephone, name },
            }).then(async (res) => {
              Reserved.create({
                pax,
                idClient: res.id,
                hour,
                data,
                waiter,
                idRestaurant,
                timezone,
                idState: resp.id,
              });
            });
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
      include: [{ model: Client }, { model: State }],
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
